import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import validator from "validator";
import Post from "../models/post";
import Comment from "../models/comment";
import unescapeUser from "../utils/unescapeUser";
import upload from "../middleware/multerConfig";
import unescapePost from "../utils/unescapePost";

const fullUser = "-email -password";
const shortUser = "avatar banner first_name last_name";

// @route GET /users
// @access Private
// @description Gets all user profiles
const get_users = async (req: Request, res: Response) => {
  try {
    // Always omit email and password when sending users' info to the client
    const users = await User.find().select(fullUser);
    if (users) {
      // Unescape all users' input data which is always santized.
      users.map((user) => {
        unescapeUser(user);
        return user;
      });
      res.json({ message: "List of all users.", users });
    } else {
      res.status(404).json({ message: "There are no users yet!" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /users/:userID
// @access Private
// @description Gets one singular profile
const get_profile = async (req: Request, res: Response) => {
  try {
    // Wait for the API to get the req. user, and display all info about it. (except pw and email)
    const user = await User.findById(req.params.userID).select(fullUser);
    if (user) {
      unescapeUser(user);
      return res.status(200).json({ message: "User profile data", user });
    }

    return res.status(404).json({ message: "User was not found!" });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      res.status(404).json({ message: "User was not found." });
    } else {
      return res
        .status(500)
        .json({ message: "An unexpected error has occured", err });
    }
  }
};

// @route GET /users/:userID/posts
// @access Private
// @description Gets the user's existing posts
const get_user_posts = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    // This is called a query with deep population
    const userPosts = await Post.find({ user: userID })
      .sort({ createdAt: "desc" })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: shortUser,
        },
        options: { sort: { createdAt: "desc" } },
      })
      .populate({ path: "user", select: shortUser });

    const posts = userPosts.map((post) => {
      unescapePost(post);
      return post;
    });

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({
      message: "An unexpected error has occured.",
      err,
    });
  }
};

// @route PUT /users/:userID
// @access Private
// @description Update the current user's existing profile, and sends back the updated User object.
const update_account = async (req: Request, res: Response) => {
  const updateFields = {
    first_name: req.body.ufirst_name,
    last_name: req.body.ulast_name,
    bio: req.body.ubio,
  };

  try {
    const user = await User.findById(req.params.userID);
    if (user) {
      const updateObject = {};
      for (const field in updateFields) {
        //@ts-ignore
        if (updateFields[field]) {
          //@ts-ignore
          updateObject[field] = updateFields[field];
        }
      }
      await user.updateOne(updateObject).then(async () => {
        const uUser = await User.findById(req.params.userID); // Get the fresh user.
        if (uUser) {
          unescapeUser(uUser);
          res.status(200).json({ message: "Update success.", uUser });
        } else {
          res.status(404).json({ message: "Updated user cannot be found." });
        }
      });
    } else {
      res.status(404).json({ message: "This user doesn't exist." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// @route POST /users/:userID/avatar
// @access Private
// @description Update the current user's avatar, and sends back the updated User object for context refresh.
const update_pfp = [
  //File related error handling happens inside multerConfig.
  upload.single("myImage"),
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userID);
    if (user && req.file) {
      await user.updateOne({
        avatar: {
          url: req.file.path,
          alt: req.file.originalname,
        },
      });

      const updatedUser = await User.findById(req.params.userID);
      if (updatedUser) res.status(202).json({ updatedUser });
    }
    if (!user) res.status(404).json({ message: "User was not found" });
    if (!req.file) res.status(404).json({ message: "No image found." });
  },
];

// @route POST /users/:userID/banner
// @access Private
// @description Update the current user's banner, and sends back the updated User object for context refresh.
const update_banner = [
  //File related error handling happens inside multerConfig.
  upload.single("myBanner"),
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userID);
    if (user && req.file) {
      await user.updateOne({
        banner: {
          url: req.file.path,
          alt: req.file.originalname,
        },
      });

      const updatedUser = await User.findById(req.params.userID);
      if (updatedUser) res.status(202).json({ updatedUser });
    }
    if (!user) res.status(404).json({ message: "User was not found" });
    if (!req.file) res.status(404).json({ message: "No image found." });
  },
];

// @route DELETE /users/:userID
// @access Private
// @description Delete the current user's data. - NOT IMPLEMENTED YET.
const delete_account = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  const user = await User.findById(userID);
  if (user) {
    Promise.all([
      User.updateMany({ friends: userID }, { $pull: { friends: userID } }),
      User.updateMany(
        { requestsReceived: userID },
        { $pull: { requestsReceived: userID } }
      ),
      User.updateMany(
        { requestsSent: userID },
        { $pull: { requestsSent: userID } }
      ),
      Post.deleteMany({ user: userID }),
      Comment.deleteMany({ user: userID }),
      user.deleteOne(),
    ])
      .then(() => {
        res.status(200).json({
          message: "Deleted all account and account-related data successfully.",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  } else {
    res.status(404).json({
      message: "Cannot delete which that doesn't exist..",
    });
  }
});

// @route GET /users/:userID/friends
// @access Private
// @description See the accessed user's friends list. - IMPLEMENTED in get_friends API request.
const get_friends_list = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  const friendsList = await User.findById(userID).select("friends").populate({
    path: "friends",
    select: fullUser,
  });
  if (friendsList) {
    res.json(friendsList);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
});

// @route GET /users/:userID/received
// @access Private
// @description Get the user's pending received friend requests. - IMPLEMENTED in get_friends API request.
const get_fr_received = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    const user = await User.findById(userID)
      .select("requestsReceived")
      .populate({
        path: "requestsReceived",
        select: shortUser,
      });
    if (user) return res.status(200).json({ received: user.requestsReceived });
    return res.status(404).json({ message: "User was not found." });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      res.status(404).json({ message: "User was not found." });
    } else {
      res.status(500).json({ message: "Unexpected error occured", err });
    }
  }
};

// @route GET /users/:userID/sent
// @access Private
// @description Get the user's pending sent friend requests.
const get_fr_sent = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    const user = await User.findById(userID).select("requestsSent").populate({
      path: "requestsSent",
      select: shortUser,
    });
    if (user) return res.status(200).json({ sent: user.requestsSent });
    return res.status(404).json({ message: "User was not found." });
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      res.status(404).json({ message: "User was not found." });
    } else {
      res.status(500).json({ message: "Unexpected error occured", err });
    }
  }
};

// @route POST /users/:receiverID/send
// @access Private
// @description Send a friend request to a different user.
const send_request = asyncHandler(async (req, res) => {
  const { senderID } = req.body;
  const { receiverID }: any = req.params;

  const sender = await User.findById(senderID);
  const receiver = await User.findById(receiverID);

  if (sender && receiver) {
    const isFriends = sender.friends.includes(receiverID);
    const isFRSent = sender.requestsSent.includes(receiverID);
    const isFRPending = sender.requestsReceived.includes(receiverID);

    switch (true) {
      case isFriends:
        res.json({
          message: "You are already friends with this user.",
        });
        break;
      case isFRSent:
        res.json({
          message: "You already sent a friend request to this user.",
        });
        break;
      case isFRPending:
        res.json({
          message: "You already have a friend request from this user.",
        });
        break;
      case senderID === receiverID:
        res.json({
          message: "You can't send a friend request to yourself!",
        });
        break;
      default:
        {
          Promise.all([
            sender.updateOne({
              $push: { requestsSent: receiverID },
            }),
            receiver.updateOne({
              $push: { requestsReceived: senderID },
            }),
          ])
            .then(() => {
              res.json({
                message: `${sender.first_name} sent a successful friend request to ${receiver.first_name}`,
              });
            })
            .catch((err) => {
              res.status(500).json({ message: err.message });
            });
        }
        break;
    }
  } else {
    res.status(500).json({
      message: "An error occured while sending this friend request.",
    });
  }
});

// @route PUT /users/:senderID/accept
// @access Private
// @description Accept a pending friend request and become friends with a different user.
const accept_request = asyncHandler(async (req, res) => {
  const { senderID }: any = req.params;
  const { receiverID } = req.body;

  const receiver = await User.findById(receiverID);
  const sender = await User.findById(senderID);

  if (
    receiver &&
    sender &&
    receiver.requestsReceived.includes(senderID) &&
    sender.requestsSent.includes(receiverID)
  ) {
    Promise.all([
      receiver.updateOne({
        $pull: { requestsReceived: senderID },
      }),
      receiver.updateOne({ $push: { friends: senderID } }),
      sender.updateOne({
        $pull: { requestsSent: receiverID },
      }),
      sender.updateOne({ $push: { friends: receiverID } }),
    ])
      .then(() => {
        res.json({
          message: `${receiver.first_name} is now friends with ${sender.first_name}!`,
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(500).json({
      message: "This friend request does not exist.",
    });
  }
});

// @route DELETE /users/:receiverID/cancel
// @access Private
// @description Cancel a pending friend request.
const cancel_request = asyncHandler(async (req, res) => {
  const { receiverID }: any = req.params;
  const { senderID } = req.body;

  const sender = await User.findById(senderID);
  const receiver = await User.findById(receiverID);

  if (
    receiver &&
    sender &&
    receiver.requestsReceived.includes(senderID) &&
    sender.requestsSent.includes(receiverID)
  ) {
    Promise.all([
      receiver.updateOne({
        $pull: { requestsReceived: senderID },
      }),
      sender.updateOne({
        $pull: { requestsSent: receiverID },
      }),
    ])
      .then(() => {
        res.json({
          message: `${sender.first_name} canceled their friend request to ${receiver.first_name}. :(`,
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(500).json({
      message: "This friend request does not exist.",
    });
  }
});

// @route DELETE /users/:senderID/cancel
// @access Private
// @description Decline a pending friend request.
const decline_request = asyncHandler(async (req, res) => {
  const { senderID }: any = req.params;
  const { receiverID } = req.body;

  const receiver = await User.findById(receiverID);
  const sender = await User.findById(senderID);

  if (
    receiver &&
    sender &&
    receiver.requestsReceived.includes(senderID) &&
    sender.requestsSent.includes(receiverID)
  ) {
    Promise.all([
      receiver.updateOne({
        $pull: { requestsReceived: senderID },
      }),
      sender.updateOne({
        $pull: { requestsSent: receiverID },
      }),
    ])
      .then(() => {
        res.json({
          message: `${receiver.first_name} declined ${sender.first_name}'s friend request. :(`,
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(500).json({
      message: "This friend request does not exist.",
    });
  }
});

// @route DELETE /users/:senderID/cancel
// @access Private
// @description Remove an user from your friends list.
const remove_friend = asyncHandler(async (req, res) => {
  const { removedID }: any = req.params;
  const { removerID } = req.body;

  const remover = await User.findById(removerID);
  const removed = await User.findById(removedID);
  if (
    remover &&
    removed &&
    remover.friends.includes(removedID) &&
    removed.friends.includes(removerID)
  ) {
    Promise.all([
      remover.updateOne({
        $pull: { friends: removedID },
      }),
      removed.updateOne({
        $pull: { friends: removerID },
      }),
    ])
      .then(() => {
        res.json({
          message: `${remover.first_name} removed ${removed.first_name} from their friends list. :(`,
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(500).json({ message: "This friendship does not exist." });
  }
});

export default {
  get_users,
  get_profile,
  get_user_posts,
  update_account,
  update_pfp,
  update_banner,
  delete_account,
  get_friends_list,
  get_fr_received,
  get_fr_sent,
  send_request,
  cancel_request,
  accept_request,
  decline_request,
  remove_friend,
};

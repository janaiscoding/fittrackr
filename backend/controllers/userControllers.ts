import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Post from "../models/post";
import Comment from "../models/comment";
import Workout from "../models/workout";
import multer from "multer";
import uploadPfp from "../middleware/multerConfig";

// For searching in the community, for friends list and also friend requests
const get_users = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select("first_name last_name avatar posts workouts friends") // Figure out a default avatar picture so this will get selected properly.
      .lean();
    if (users) {
      res.json({ message: "List of all users.", users });
    } else {
      res.status(404).json({ message: "There are no users yet!" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const get_profile = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    const user = await User.findById(userID)
      .select("-password -email")
      .populate("workouts")
      .populate({
        path: "posts",
        populate: { path: "comments", select: "text likes createdAt" },
      });
    if (user) return res.json({ message: "GET user profile", user });
    return res.status(404).json({ message: "User was not found!" });
  } catch (err) {
    return res.status(404).json({ message: "User was not found!" });
  }
};

const update_account = [
  body("ucurrent_weight")
    .optional()
    .trim()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Weight must be above 1 kilo")
    .escape(),
  body("ugoal_weight").optional().trim().toInt().escape(),
  body("ufirst_name")
    .trim()
    .optional()
    .isLength({ min: 1 })
    .withMessage("First name must be above 1 characters long.")
    .isLength({ max: 30 })
    .withMessage("First name must be 30 characters maximum.")
    .escape(),
  body("ulast_name")
    .trim()
    .optional()
    .isLength({ min: 1 })
    .withMessage("Last name must be above 1 characters long.")
    .isLength({ max: 30 })
    .withMessage("Last name must be 30 characters maximum.")
    .escape(),
  body("ubirthday").optional().isDate().withMessage("Must be a valid date."),
  async (req: Request, res: Response) => {
    const { userID } = req.params;

    const updateFields = {
      birthday: req.body.ubirthday,
      last_name: req.body.ulast_name,
      current_weight: req.body.ucurrent_weight,
      goal_weight: req.body.ugoal_weight,
      first_name: req.body.ufirst_name,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(userID);
      if (user) {
        const updateObject = {};
        for (const field in updateFields) {
          //@ts-ignore
          if (updateFields[field]) {
            //@ts-ignore
            updateObject[field] = updateFields[field];
          }
        }
        await user.updateOne(updateObject);
        const updatedUser = await User.findById(userID);
        res.json({ message: "Updated user successfully.", updatedUser });
      } else {
        res.status(404).json({ message: "This user doesn't exist." });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
];

const update_pfp = [
  (req: Request, res: Response, next: NextFunction) => {
    uploadPfp.single("myImage")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ error: "File size exceeds the limit of 4MB." });
        }
        return res.status(500).json({ error: "File upload error." });
      } else if (err) {
        return res.status(400).json(err);
      }
      next();
    });
  },
  async (req: Request, res: Response) => {
    if (!req.file)
      return res
        .status(500)
        .json({ message: "No profile picture upload found" });
    else {
      try {
        const user = await User.findById(req.params.userID);
        if (user && user.avatar) {
          user.avatar.data = req.file.buffer;
          user.avatar.contentType = req.file.mimetype;
          await user.save();
          res
            .status(201)
            .json({ message: "Profile picture updated successfully!" });
        }
        if (!user) {
          return res.status(404).json({ error: "This user doesn't exist." });
        }
      } catch (err: any) {
        if (err.kind === "ObjectId") {
          return res.status(404).json({ error: "This user doesn't exist." });
        }
        return res.status(500).json({
          message: "There was an error updating the user's profile picture.",
          err,
        });
      }
    }
  },
];

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
      Workout.deleteMany({ user: userID }),
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
    res
      .status(404)
      .json({ message: "Cannot delete which that doesn't exist.." });
  }
});

const get_friends_list = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  const friendsList = await User.findById(userID).select("friends").populate({
    path: "friends",
    select: "first_name last_name avatar posts workouts friends",
  });
  if (friendsList) {
    res.json(friendsList);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
});

const get_fr_received = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    const user = await User.findById(userID)
      .select("requestsReceived")
      .populate({
        path: "requestsReceived",
        select: "first_name last_name avatar posts workouts friends",
      });
    if (user) {
      res.status(200).json({ requestsReceived: user.requestsReceived });
    } else {
      res.status(404).json({ message: "User was not found." });
    }
  } catch (err: any) {
    if (err.kind === "ObjectId") {
      res.status(404).json({ message: "User was not found." });
    } else {
      res.status(500).json({ message: "Unexpected error occured", err });
    }
  }
};

const get_fr_sent = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  const requestsSent = await User.findById(userID).select("requestsSent");
  if (requestsSent) {
    res.json(requestsSent);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
});

const send_request = asyncHandler(async (req, res) => {
  const { senderID, receiverID }: any = req.params;
  const sender = await User.findById(senderID);
  const receiver = await User.findById(receiverID);
  if (sender && receiver) {
    const isFriends = sender.friends.includes(receiverID);
    const isFRSent = sender.requestsSent.includes(receiverID);
    const isFRPending = sender.requestsReceived.includes(receiverID);

    switch (true) {
      case isFriends:
        res.json({ message: "You are already friends with this user." });
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
        res.json({ message: "You can't send a friend request to yourself!" });
        break;
      default:
        {
          Promise.all([
            sender.updateOne({ $push: { requestsSent: receiverID } }),
            receiver.updateOne({ $push: { requestsReceived: senderID } }),
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
    res
      .status(500)
      .json({ message: "An error occured while sending this friend request." });
  }
});
const accept_request = asyncHandler(async (req, res) => {
  const { receiverID, senderID }: any = req.params;

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
    res.status(500).json({ message: "This friend request does not exist." });
  }
});

const cancel_request = asyncHandler(async (req, res) => {
  const { senderID, receiverID }: any = req.params;

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
    res.status(500).json({ message: "This friend request does not exist." });
  }
});

const decline_request = asyncHandler(async (req, res) => {
  const { receiverID, senderID }: any = req.params;

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
    res.status(500).json({ message: "This friend request does not exist." });
  }
});

const remove_friend = asyncHandler(async (req, res) => {
  const { removerID, removedID }: any = req.params;
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
  update_account,
  update_pfp,
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

// // local testing
// async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.findById(req.params.userID);
//     if (!user) {
//       return res.status(404).json({ error: "This user doesn't exist" });
//     }
//     res.render("pic", {
//       contentType: user.pfp.contentType,
//       data: user.pfp.data,
//     });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "There was an error upading the user's profile picture." });
//   }
// },

import { Request, Response } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import validator from "validator";
import Post from "../models/post";
import Comment from "../models/comment";
import Workout from "../models/workout";
const hiddenFields =
  "-password -email -requestsSent -requestsReceived -friendRequests";

const get_users = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("first_name last_name").lean();
    if (users) {
      res.json({ info: "GET all users", users });
    } else {
      res.status(404).json({ info: "There are no users yet" });
    }
  } catch (err: any) {
    res.status(500).json({ info: err.message });
  }
};

const get_profile = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  const user = await User.findById(userID)
    .select("-password -email") // "-requestsSent -requestsReceived -friendRequests"
    .populate("workouts")
    .populate({
      path: "posts",
      select: "text comments likes createdAt updatedAt",
      populate: { path: "comments", select: "text likes createdAt" },
    })
    .exec();
  if (user) {
    res.json({ info: "GET user profile", user });
  } else {
    res.status(404).json({ info: "User was not found!" });
  }
});

const update_account = [
  body("uage")
    .optional()
    .trim()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Age must be, technically, above one..")
    .isInt({ max: 100 })
    .withMessage("Doubt you're thaaaat old... (less than 100 years old pls)")
    .escape(),
  body("ucur_weight")
    .optional()
    .trim()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Weight must be above 1 kilo")
    .escape(),
  body("ugoal_weight").optional().trim().toInt().escape(),
  body("ufirst_name")
    .trim()
    .exists()
    .withMessage("First name is required.")
    .isLength({ min: 1 })
    .withMessage("Name must be above 1 characters long.")
    .isLength({ max: 30 })
    .withMessage("Name must be 30 characters maximum.")
    .escape(),
  body("ulast_name")
    .trim()
    .exists()
    .withMessage("Last name is required.")
    .isLength({ min: 1 })
    .withMessage("Name must be above 1 characters long.")
    .isLength({ max: 30 })
    .withMessage("Name must be 30 characters maximum.")
    .escape(),
  asyncHandler(async (req, res) => {
    const { userID } = req.params;
    const { uage, ucur_weight, ugoal_weight, ufirst_name, ulast_name } =
      req.body;
    const user = await User.findById(userID).select(hiddenFields).exec();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        info: "Errors while validation",
        errors: errors.array(),
        uage,
        ucur_weight,
        ugoal_weight,
        ufirst_name: validator.unescape(ufirst_name),
        ulast_name: validator.unescape(ulast_name),
      });
    } else {
      if (user) {
        await user.updateOne({
          age: uage,
          cur_weight: ucur_weight,
          goal_weight: ugoal_weight,
          first_name: ufirst_name,
          last_name: ulast_name,
        });
        res.json({ info: "Updated user successfully." });
      } else {
        res.status(404).json({ info: "This user doesn't exist." });
      }
    }
  }),
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
          info: "Deleted all account and account-related data successfully.",
        });
      })
      .catch((err) => {
        res.status(500).json({
          info: err.message,
        });
      });
  } else {
    res.status(404).json({ info: "Cannot delete which that doesn't exist.." });
  }
});

const get_friends_list = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  const friendsList = await User.findById(userID).select("friends");
  if (friendsList) {
    res.json(friendsList);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
});

const get_fr_received = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  const requestsReceived = await User.findById(userID).select(
    "requestsReceived"
  );
  if (requestsReceived) {
    res.json(requestsReceived);
  } else {
    res.status(500).json({ error: "Something went wrong." });
  }
});

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
    // check if they're already friends // or if the request is sent // if a request is already received dont allow them to post
    const isFriends = sender.friends.includes(receiverID);
    const isFRSent = sender.requestsSent.includes(receiverID);
    const isFRPending = sender.requestsReceived.includes(receiverID);

    switch (true) {
      case isFriends:
        res.json({ info: "You are already friends with this user." });
        break;
      case isFRSent:
        res.json({ info: "You already sent a friend request to this user." });
        break;
      case isFRPending:
        res.json({ info: "You already have a friend request from this user." });
        break;
      case senderID === receiverID:
        res.json({ info: "You can't send a friend request to yourself!" });
        break;
      default:
        {
          Promise.all([
            sender.updateOne({ $push: { requestsSent: receiverID } }),
            receiver.updateOne({ $push: { requestsReceived: senderID } }),
          ])
            .then(() => {
              res.json({
                info: `${sender.first_name} sent a successful friend request to ${receiver.first_name}`,
              });
            })
            .catch((err) => {
              res.status(500).json({ info: err.message });
            });
        }
        break;
    }
  } else {
    res
      .status(500)
      .json({ info: "An error occured while sending this friend request." });
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
          info: `${receiver.first_name} is now friends with ${sender.first_name}!`,
        });
      })
      .catch((err) => {
        res.status(500).json({ info: err.message });
      });
  } else {
    res.status(500).json({ info: "This friend request does not exist." });
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
          info: `${sender.first_name} canceled their friend request to ${receiver.first_name}. :(`,
        });
      })
      .catch((err) => {
        res.status(500).json({ info: err.message });
      });
  } else {
    res.status(500).json({ info: "This friend request does not exist." });
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
          info: `${receiver.first_name} declined ${sender.first_name}'s friend request. :(`,
        });
      })
      .catch((err) => {
        res.status(500).json({ info: err.message });
      });
  } else {
    res.status(500).json({ info: "This friend request does not exist." });
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
          info: `${remover.first_name} removed ${removed.first_name} from their friends list. :(`,
        });
      })
      .catch((err) => {
        res.status(500).json({ info: err.message });
      });
  } else {
    res.status(500).json({ info: "This friendship does not exist." });
  }
});

export default {
  get_users,
  get_profile,
  update_account,
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

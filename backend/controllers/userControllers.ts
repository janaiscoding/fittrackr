import User from "../models/user";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import validator from "validator";
const hiddenFields =
  "-password -email -requestsSent -requestsReceived -friendRequests";

const get_users = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("first_name last_name").lean();
  if (users) {
    res.json({ info: "GET all users", users });
  } else {
    res.status(404).json({ info: "There are no users yet" });
  }
});

const get_profile = asyncHandler(async (req, res, next) => {
  const { userID } = req.params;
  const user = await User.findById(userID)
    .select("-password -email -requestsSent -requestsReceived -friendRequests")
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
  body("ugoal_weight")
    .optional()
    .trim()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Goal weight must be above 1 kilo")
    .escape(),
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
  asyncHandler(async (req, res, next) => {
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
        await User.findByIdAndUpdate(userID, {
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

const delete_account = asyncHandler(async (req, res, next) => {
  const { userID } = req.params;
  res.json({ info: "DELETE your account.", userID });
});

export default {
  get_users,
  get_profile,
  update_account,
  delete_account,
};

import { body } from "express-validator";
import User from "../models/user";

const signupRules = () => {
  return [
    body("first_name")
      .trim()
      .exists()
      .notEmpty()
      .withMessage("First name is required.")
      .isLength({ max: 30 })
      .withMessage("First name is too long.")
      .escape(),
    body("last_name")
      .trim()
      .exists()
      .notEmpty()
      .withMessage("Last name is required.")
      .isLength({ max: 30 })
      .withMessage("Last name is too long.")
      .escape(),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is not valid.")
      .custom(async (email) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("Email is already in use!");
        }
      }),
    body("password")
      .trim()
      .exists()
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Password is too short."),
  ];
};

const loginRules = () => {
  return [
    body("email").trim().isEmail().withMessage("Email is not valid."),
    body("password").trim().notEmpty().withMessage("Password is required."),
  ];
};

const rulesComment = () => {
  return [
    body("comment")
      .trim()
      .notEmpty()
      .withMessage("Comment is too short.")
      .isLength({ min: 1 })
      .isLength({ max: 140 })
      .withMessage("Comment is too long.")
      .escape(),
    body("userID").notEmpty().withMessage("UserID is required."),
  ];
};

const rulesUpdateAcc = () => {
  return [
    body("ubio")
      .optional()
      .isLength({ min: 1 })
      .withMessage("Bio is too short,")
      .isLength({ max: 140 })
      .withMessage("Bio is too long.")
      .escape(),
    body("ucurrent_weight")
      .optional()
      .trim()
      .toInt()
      .isInt({ min: 3 })
      .withMessage("Weight must be above 3 kilo."),
    body("ugoal_weight")
      .optional()
      .trim()
      .toInt()
      .isInt({ min: 3 })
      .withMessage("Weight must be above 3 kilo."),
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
  ];
};

export { signupRules, loginRules, rulesComment, rulesUpdateAcc };

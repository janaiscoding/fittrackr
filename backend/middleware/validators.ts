import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import validator from "validator";
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

const valSignup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { first_name, last_name } = req.body;
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({
    errors: errors.array(),
    first_name: validator.unescape(first_name),
    last_name: validator.unescape(last_name),
  });
};

const loginRules = () => {
  return [
    body("email").trim().isEmail().withMessage("Email is not valid."),
    body("password").trim().notEmpty().withMessage("Password is required."),
  ];
};

const valLogin = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  return res.status(401).json({ errors: errors.array() });
};
export { signupRules, loginRules, valSignup, valLogin };

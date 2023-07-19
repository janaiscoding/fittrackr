import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import "dotenv/config";

// add default User pic + default banner + default bio
const create_user = [
  body("first_name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 2 })
    .withMessage("First name must be longer than 2 characters.")
    .isLength({ max: 30 })
    .withMessage("First name can't be more than 30 characters.")
    .escape(),
  body("last_name")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 2 })
    .withMessage("Last name must be longer than 2 characters.")
    .isLength({ max: 30 })
    .withMessage("Last name can't be more than 30 characters.")
    .escape(),
  body("email")
    .trim()
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email.")
    .escape(),
  body("password")
    .trim()
    .exists()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 24 })
    .withMessage("Password must be between 8 and 24 characters long.")
    .escape(),
  body("conf_password")
    .trim()
    .exists()
    .isLength({ min: 8, max: 24 })
    .withMessage("Passwords must match.")
    .escape(),
  async (req: Request, res: Response) => {
    const { first_name, last_name, email, password, conf_password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        first_name: validator.unescape(first_name),
        last_name: validator.unescape(last_name),
      });
    }
    if (password === conf_password) {
      try {
        bcrypt.hash(password, 10, async (err, hashed) => {
          if (err) {
            res.status(500).json({ message: err.message });
          } else {
            await User.create({
              first_name,
              last_name,
              email, // unique in db
              password: hashed,
            })
              .then(() => {
                res
                  .status(201)
                  .json({ message: "New user successfully created!" });
              })
              .catch((err) => {
                res.status(400).json({
                  message: "Email is already in use!",
                  error: err.message,
                });
              });
          }
        });
      } catch (err: any) {
        res.status(500).json({
          message: "Internal server error",
          error: err.message,
        });
      }
    } else {
      res.status(400).json({ message: "Passwords do not match." });
    }
  },
];

const login_post = [
  body("email", "Email is required").trim().isEmail().notEmpty().escape(),
  body("password", "Password is required").trim().notEmpty().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    } else {
      try {
        const user = await User.findOne({ email }).exec();
        if (!user)
          return res.status(404).json({
            message: "Could not find an account associated with this email",
          });
        bcrypt.compare(password, user.password, (err, compare) => {
          if (err) return next(err);
          if (compare) {
            //@ts-ignore
            const token = jwt.sign({ userId: user._id }, process.env.secret, {
              expiresIn: "24hr",
            });

            // return res
            //   .cookie("token", token, {
            //     sameSite: "strict",
            //     httpOnly: true,
            //     maxAge: 60 * 1000 * 20,
            //   })
            return res.status(200).json({ token, user });
          } else {
            return res
              .status(400)
              .json({ message: "Your password is incorrect" });
          }
        });
      } catch (err) {
        res.json(err);
      }
    }
  },
];
const verify_token = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided, please log in." });
  }
  try {
    // @ts-ignore
    const verify = jwt.verify(token, process.env.secret);
    const user = await User.findById(verify.userId).select("-email -password");
    if (!user) res.status(404).json({ message: "User doesn't exist." });
    else {
      res.status(200).json({ user, token });
    }
  } catch {
    res.status(401).json({ message: "Token is invalid." });
  }
};
export default {
  login_post,
  create_user,
  verify_token,
};

import express, { Express, NextFunction, Request, Response } from "express";
import User from "../models/user";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import validator from "validator";
import jwt from "jsonwebtoken";
import "dotenv/config";

// add default User pic + default banner + default bio
const create_user = [
  body("age")
    .optional()
    .trim()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Age must be, technically, above one..")
    .isInt({ max: 100 })
    .withMessage("Doubt you're thaaaat old... (less than 100 years old pls)")
    .escape(),
  body("cur_weight")
    .optional()
    .trim()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Weight must be above 1 kilo")
    .escape(),
  body("goal_weight")
    .optional()
    .trim()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Goal weight must be above 1 kilo")
    .escape(),
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 1 })
    .withMessage("First name must be above 1 characters long.")
    .isLength({ max: 30 })
    .withMessage("First name must be 30 characters maximum.")
    .escape(),
  body("last_name")
    .trim()
    .exists()
    .withMessage("Last name is required.")
    .isLength({ min: 1 })
    .withMessage("Last name must be above 1 characters long.")
    .isLength({ max: 30 })
    .withMessage("Last name must be 30 characters maximum.")
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
  async (req: Request, res: Response) => {
    const {
      age,
      cur_weight,
      goal_weight,
      first_name,
      last_name,
      email,
      password,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      bcrypt.hash(password, 10, async (err, hashed) => {
        if (err) {
          res.status(500).json({ message: err.message });
        } else {
          await User.create({
            age,
            cur_weight,
            goal_weight,
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
  },
];

const login_post = [
  body("email", "Email is required").trim().isEmail().notEmpty().escape(),
  body("password", "Password is required").trim().notEmpty().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    } else {
      // @ts-ignore
      passport.authenticate(
        "local",
        { session: false },
        // @ts-ignore
        (err, user, info) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(404).json({
              error: info.message,
            });
          }
          req.login(user, { session: false }, (err) => {
            if (err) {
              return next(err);
            }
            // @ts-ignore
            const token = jwt.sign({ userId: user._id }, process.env.secret, {
              expiresIn: "24h",
            });
            return res.status(200).json({ token, user });
          });
        }
      )(req, res, next);
    }
  },
];
const verify_token = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ info: "No token provided, please log in." });
  }
  try {
    // @ts-ignore
    const verify = jwt.verify(token, process.env.secret);
    const user = await User.findById(verify.userId).select("-email -password");
    if (!user) res.status(404).json({ info: "User doesn't exist." });
    else {
      res.status(200).json({ user, token });
    }
  } catch {
    res.status(401).json({ info: "Token is invalid." });
  }
};
export default {
  login_post,
  create_user,
  verify_token,
};

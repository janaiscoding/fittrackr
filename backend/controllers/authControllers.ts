import express, { Express, NextFunction, Request, Response } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import validator from "validator";
import jwt from "jsonwebtoken";
import "dotenv/config";

const create_user = [
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
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
      res.json({
        first_name: validator.unescape(first_name),
        last_name: validator.unescape(last_name),
        email: validator.unescape(email),
        password: validator.unescape(password),
        errors: errors.array(),
      });
      return;
    } else {
      bcrypt.hash(password, 10, async (err, hashed) => {
        if (err) {
          res.status(500).json(err.message);
        } else {
          const userFound = await User.findOne({ email });
          if (userFound) {
            res.json({ error: "Email is already in use!" });
          } else {
            const user = new User({
              age,
              cur_weight,
              goal_weight,
              first_name,
              last_name,
              email,
              password: hashed,
            });
            await user.save();
            res.status(201).json({ message: "New user created!" });
          }
        }
      });
    }
  }),
];

const login_post = [
  body("email", "Email is required").trim().isEmail().notEmpty().escape(),
  body("password", "Password is required").trim().notEmpty().escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(401).json({ errors: validationErrors.array() });
      return;
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
            return res.status(401).json({
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
  }),
];

export default {
  login_post,
  create_user,
};

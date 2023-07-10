import express, { Express, NextFunction, Request, Response } from "express";
import User from '../models/user'
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import validator from "validator";
import jwt from "jsonwebtoken";
import "dotenv/config";

const create_user = [
  body("age").trim().escape(),
  body("cur_weight").trim().escape(),
  body("goal_weight").trim().escape(),
  // On sign up, ^ above fields are optional
  body("first_name", "First name is required").trim().notEmpty().escape(),
  body("last_name", "Last name is required").trim().notEmpty().escape(),
  body("email", "Email is required").trim().isEmail().notEmpty().escape(),
  body("password", "Password is required").trim().notEmpty().escape(),
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
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.json({ errors: validationErrors.array() });
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
    const { email, password } = req.body;
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
              expiresIn: "1h",
            });
            return res.status(200).json({ user, token });
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

import express, { Express, NextFunction, Request, Response } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

const signup_post = [
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
  body("email", "Email is required 122").trim().isEmail().notEmpty().escape(),
  body("password", "Password is required").trim().notEmpty().escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      res.status(401).json({ errors: validationErrors.array() });
      return;
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({
          message: "Could not find an account associated with this email",
        });
      } else {
        bcrypt.compare(password, user.password, (err, compare) => {
          if (err) return next(err);
          if (compare) {
            const opts = {
              expiresIn: "2hr",
            };
            const secret = process.env.secret;
            // @ts-ignore
            const token = jwt.sign({ email: user.email }, secret, opts);
            req.user = user;
            return res.json({ token });
          } else {
            res.status(401).json({ message: "Your password is incorrect" });
          }
        });
      }
    }
  }),
];

export default {
  login_post,
  signup_post,
};

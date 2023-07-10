import express, { Express, NextFunction, Request, Response } from "express";
import User from "../models/user";
import Workout from "../models/workout";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import validator from "validator";
import jwt from "jsonwebtoken";
import "dotenv/config";
const hiddenFields =
  "-password -email -requestsSent -requestsReceived -friendRequests";

// TO DO: ADD UNESCAPING // DONE: ERROR HANDLING
const get_user_workouts = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("workouts");
    if (user && user.workouts.length > 0) {
      res.json({ info: "User's workouts", workouts: user.workouts });
    } else {
      res.status(404).json({ info: "User has no workouts yet!" });
    }
  } catch (err: any) {
    res.status(404).json({ info: "User does not exist!", err: err.message });
  }
});

// TO DO: ADD VALIDATION
const create_workout = [
  body("name", "Name is required, must be 2-100 characters long")
    .exists()
    .withMessage("Workout name is required.")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Workout title needs to be at least 2 characters long.")
    .isLength({ max: 100 })
    .withMessage("Workout title cannot be more than 100 characters long.")
    .escape(),
  body("duration")
    .trim()
    .exists()
    .withMessage("Workout duration is required.")
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Workout duration needs to be at least 1 minute long.")
    .isInt({ max: 600 })
    .withMessage("Workout duration cannot be more than 600 minute long.")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const { name, duration } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        name: validator.unescape(name),
        errs: errors.array(),
      });
      return;
    }
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ info: "User does not exist!" });
      }
      if (user) {
        const userWorkouts = user.workouts;
        const workout = new Workout({
          name,
          duration,
        });
        // @ts-ignore
        userWorkouts.push(workout);
        await workout.save();
        await User.findByIdAndUpdate(req.params.id, {
          workouts: userWorkouts,
        });
        res.json({ info: "CREATED NEW WORKOUT", workout });
      }
    } catch (err: any) {
      res.status(400).json({ err: err.message });
    }
  }),
];

// TO DO:
// EDIT WORKOUT

// DELETE WORKOUT

export default {
  create_workout,
  get_user_workouts,
};

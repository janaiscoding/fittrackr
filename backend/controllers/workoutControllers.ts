import { Request, Response } from "express";
import User from "../models/user";
import Workout from "../models/workout";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import validator from "validator";

import "dotenv/config";
const hiddenFields =
  "-password -email -requestsSent -requestsReceived -friendRequests";

const get_workouts = async (req: Request, res: Response) => {
  try {
    const allWorkouts = await Workout.find();
    res.json({ allWorkouts });
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

const create_workout = [
  body("description")
    .exists()
    .withMessage("Workout description is required.")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Workout description is too short.")
    .isLength({ max: 100 })
    .withMessage("Workout description is too long.")
    .escape(),
  body("userID").exists().withMessage("User id is required"),
  body("duration").optional().isInt({ min: 1 }),
  async (req: Request, res: Response) => {
    const { userID, description, duration } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
        description: validator.unescape(description),
      });
    }
    //find user associated with the workout
    try {
      const user = await User.findById(userID);
      if (!user) res.status(404).json({ message: "This user doesn't exist." });
      else {
        const newWorkout = new Workout({
          description,
          user: userID,
          duration,
        });
        await Promise.all([
          newWorkout.save(),
          user.updateOne({ $push: { workouts: newWorkout } }),
        ]);
        res.status(201).json({ newWorkout });
      }
    } catch {
      res.status(500).json({ message: "An unexpected error occured." });
    }
  },
];

// TO DO:
// EDIT WORKOUT

// DELETE WORKOUT
const delete_workout = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  res.json({ id: req.params.workoutID });
});
export default {
  create_workout,
  get_workouts,
  delete_workout,
};

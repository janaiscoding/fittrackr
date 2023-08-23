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
    const allWorkouts = await Workout.find().sort({ createdAt: "desc" });
    // .populate({ path: "user", select: "first_name last_name avatar" });
    if (allWorkouts) {
      res.status(200).json({ allWorkouts });
    } else {
      res
        .status(404)
        .json({ message: "There are no workouts registered yet." });
    }
  } catch (err) {
    res.status(500).json({ errors: err });
  }
};

const create_workout = async (req: Request, res: Response) => {
  const { userID, description, duration } = req.body;
  try {
    // find user
    const user = await User.findById(userID);
    if (!user) res.status(404).json({ message: "This user doesn't exist." });
    else {
      const newWorkout = new Workout({
        description,
        user: userID,
        duration,
      });
      // update all
      await Promise.all([
        newWorkout.save(),
        user.updateOne({ $push: { workouts: newWorkout } }),
      ])
        .then(() => {
          res.status(201).json({ newWorkout });
        })
        .catch(() => {
          res.status(400).json({ message: "There was an error." });
        });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "An unexpected error occured.", errors: err });
  }
};

const get_user_workout = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    const userWorkouts = await Workout.find({ user: userID });
    if (userWorkouts) {
      res.status(200).json({ userWorkouts });
    } else {
      res.status(404).json({ message: "No workouts are found." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "An unexpected error occured.", errors: err });
  }
};
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
  get_user_workout,
  delete_workout,
};

import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import Workout from "../models/workout";
import "dotenv/config";

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
const update_workout = async (req: Request, res: Response) => {
  const { uDescription, uDuration } = req.body;
  const { workoutID } = req.params;
  try {
    const workout = await Workout.findById(req.params.workoutID);
    if (workout) {
      //new workout
      const workout = await Workout.findById(workoutID);
      if (workout) {
        // optional fields?
        await workout
          .updateOne({
            description: uDescription,
            duration: uDuration, //make this optional like on user.
          })
          .then(() => {
            res.status(200).json({
              message: "Workout was successfully updated!",
            });
          });
      } else {
        res.status(403).json({ message: "You cannot edit this post." });
      }
    } else {
      res
        .status(404)
        .json({ message: "This workout can't be updataed: It doesn't exist." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "An unexpected error occured.", errors: err });
  }
};

// DELETE WORKOUT
const delete_workout = async (req: Request, res: Response) => {
  const { workoutID } = req.params;
  const { userID } = req.body;
  try {
    const workout = await Workout.findById(workoutID);
    const user = await User.findById(userID);
    if (workout && user) {
      // user!.updateOne({ $pull: { posts: postID } }),
      Promise.all([
        workout.deleteOne(),
        user.updateOne({ $pull: { workouts: workoutID } }),
      ]);
      await workout.deleteOne();
      // also update user.
      res.status(200).json({ message: "Workout was deleted successfully." });
    } else {
      res.status(404).json({
        message: "This workout can't be deleted because it does not exist.",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "An unexpected error occured.", errors: err });
  }
};

export default {
  create_workout,
  get_workouts,
  get_user_workout,
  delete_workout,
  update_workout,
};

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

const get_user_workouts = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("workouts").exec();
  res.json({ info: "User's workouts", workouts: user.workouts });
});

const create_workout = asyncHandler(async (req, res, next) => {
  const { type, duration } = req.body;
  const user = await User.findById(req.params.id);
  const userWorkouts = user?.workouts;
  const workout = new Workout({
    type,
    duration,
  });
  // @ts-ignore
  userWorkouts?.push(workout);
  await User.findByIdAndUpdate(req.params.id, {
    workouts: userWorkouts,
  });
  res.json({ info: "CREATE NEW WORKOUT", id: req.params.id, userWorkouts });
});

export default {
    create_workout,
    get_user_workouts
}
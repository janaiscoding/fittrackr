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

const get_users = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("first_name last_name").lean();
  if (users) {
    res.json({ info: "GET all users", users });
  } else {
    res.status(404).json({ info: "There are no users yet" });
  }
});

const get_profile = asyncHandler(async (req, res, next) => {
  const { userID } = req.params;
  const user = await User.findById(userID)
    .select("-password -email -requestsSent -requestsReceived -friendRequests")
    .populate("workouts")
    .populate({
      path: "posts",
      select: "text comments likes createdAt updatedAt",
      populate: { path: "comments", select: "text likes createdAt" },
    })
    .exec();
  if (user) {
    res.json({ info: "GET user profile", user });
  } else {
    res.status(404).json({ info: "User was not found!" });
  }
});

const create_post = asyncHandler(async (req, res, next) => {
  const { userID } = req.params;
  res.json({ info: "CREATE POST", userID });
});
const update_account = asyncHandler(async (req, res, next) => {
  const { userID } = req.params;
  res.json({ info: "UPDATE your account.", userID });
});

const delete_account = asyncHandler(async (req, res, next) => {
  const { userID } = req.params;
  res.json({ info: "DELETE your account.", userID });
});

export default {
  get_users,
  get_profile,
  create_post,
  update_account,
  delete_account,
};

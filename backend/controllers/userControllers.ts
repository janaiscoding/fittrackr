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
  // On individual profiles I need to populate all of it, and unescape
  if (req.params.id === req.query.current) {
    // Always use query ?current=User._id when I am fetching loggedin profile
    const user = await User.findById(req.params.id).select("-password -email");

    res.json({ info: "GET my", user });
  } else {
    // No query = different
    const user = await User.findById(req.params.id)
      .select(
        "-password -email -requestsSent -requestsReceived -friendRequests"
      )
      .populate("workouts")
      .exec();
    // const userPosts = await User.find({})
    //   .select("posts first_name last_name")
    //   .populate({ path: "posts", select: "text comments likes createdAt" })
    //   .sort({ posts: 1 })
    //   .exec();
    //   .populate({ path: "friends"})
    //   .populate({ path: "workouts"})
    //      GOTTA FIX this mess
    //   .exec();

    res.json({ info: "GET diff", user });
  }
});

const create_post = asyncHandler(async (req, res, next) => {
  res.json({ info: "CREATE POST", id: req.params.id });
});
const update_account = asyncHandler(async (req, res, next) => {
  res.json({ info: "UPDATE your account.", param: req.params.id });
});

const delete_account = asyncHandler(async (req, res, next) => {
  res.json({ info: "DELETE your account.", param: req.params.id });
});

export default {
  get_users,
  get_profile,
  create_post,
  update_account,
  delete_account,
};

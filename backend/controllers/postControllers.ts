import Post from "../models/post";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import validator from "validator";

const posts_get = asyncHandler(async (req, res, next) => {
  res.json({ message: "PROTECTED ROUTE WAS ACCESSED", info: "User, User's Friends latest posts - mayber user friends, -settigs -button -logout -delete acc"});
});

export default {
  posts_get,
};

import Post from "../models/post";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import validator from "validator";
import User from "../models/user";

const posts_get = asyncHandler(async (req, res, next) => {
  const postsData = await Post.find({}).populate('user').exec(); //maybe not get the full user?
  res.json({ message: "PROTECTED ROUTE WAS ACCESSED", postsData, info: "User, User's Friends latest posts - mayber user friends, -settigs -button -logout -delete acc"});
});

// validation - user, text, comments, likes
const post_create = asyncHandler(async(req, res, next)=>{
  const {userID, text} = req.body;
  const newPost = new Post({
    user: userID,
    text,
    comments: [],
    likes: 0
  })
  await newPost.save()
  res.json({info: "New post created"})
})

export default {
  posts_get,
  post_create
};

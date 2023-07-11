import Post from "../models/post";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import validator from "validator";
import User from "../models/user";

const posts_get = asyncHandler(async (req, res, next) => {
  const postsData = await Post.find({}).populate({ path: 'user', select: 'first_name last_name' }).exec() //maybe not get the full user?

  res.json({ 
  message: "PROTECTED ROUTE WAS ACCESSED", 
  postsData:  postsData.map((post)=>{
    post.text = validator.unescape(post.text)
    return post;
  }), 
  info: "User, User's Friends latest posts - mayber user friends, -settigs -button -logout -delete acc"
  });
});

// validation - user, text, comments, likes
const post_create =[ 
  body('text')
  .trim()
  .exists()
  .withMessage('Post must be present')
  .isLength({min:5})
  .withMessage("Post must be at least 5 characters long.")
  .isLength({max:300})
  .withMessage("Post must be maximum 300 characters long.")
  .escape(),asyncHandler(async(req, res, next)=>{
  const {userID, text} = req.body;
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    res.json({
      errors: errors.array(),
      text: validator.unescape(text)
    })
  }else{ 
    const newPost = new Post({
      user: userID,
      text,
      comments: [],
      likes: 0
    })
    await newPost.save()
    res.json({info: "New post created", newPost})
  }

})]

export default {
  posts_get,
  post_create
};

import Post from "../models/post";
import Comment from "../models/comment";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import validator from "validator";
import User from "../models/user";

const posts_get = asyncHandler(async (req, res, next) => {
  const postsData = await Post.find({})
    .select("text comments likes createdAt")
    .populate({
      path: "comments",
      select: "text likes createdAt",
      populate: { path: "user", select: "first_name last_name" },
    })
    .populate({ path: "user", select: "first_name last_name" }) // + profile pic
    .sort({ createdAt: "desc" })
    .exec();
  res.json({
    message: "HOMEPAGE POSTS | PROTECTED.",
    posts: postsData.map((post) => {
      post.text = validator.unescape(post.text);
      return post;
    }),
  });
});

// validation - user, text, comments, likes
const post_create = [
  body("text")
    .trim()
    .exists()
    .withMessage("Post must be present")
    .isLength({ min: 5 })
    .withMessage("Post must be at least 5 characters long.")
    .isLength({ max: 300 })
    .withMessage("Post must be maximum 300 characters long.")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const { userID, text } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
        text: validator.unescape(text),
      });
    } else {
      //no validation errors on post
      const user = await User.findById(userID).exec();
      if (user) {
        const newPost = new Post({
          user: userID,
          text,
          comments: [],
          likes: 0,
        });
        await newPost.save();
        const initialPosts = user.posts;
        // @ts-ignore
        initialPosts.push(newPost);
        await User.findByIdAndUpdate(userID, {
          posts: initialPosts,
        });
        res.json({ info: "New post created, profile updated", newPost });
      } else {
        res.json({ info: "No user was not found to make this post." });
      }
    }
  }),
];

const post_comment = [
  body("text")
    .trim()
    .exists()
    .withMessage("Comment is required.")
    .isLength({ min: 5 })
    .withMessage("Comment must be at least 5 characters long.")
    .isLength({ max: 300 })
    .withMessage("Comment must be maximum 300 characters long")
    .escape(),
  body("user").trim().exists(),
  asyncHandler(async (req, res, next) => {
    const { userID, text } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
        text: validator.unescape(text),
      });
    } else {
      const user = await User.findById(userID).exec();
      const post = await Post.findById(req.params.id).exec();
      if (user && post) {
        const postComments = post.comments;
        const comment = new Comment({
          user: userID,
          text,
          likes: 0,
        });
        await comment.save();
        //@ts-ignore
        postComments.push(comment);
        await Post.findByIdAndUpdate(req.params.id, { comments: postComments });
        res.json({
          comment,
          info: "individual post, post req, comment",
        });
      } else {
        res.json({ info: "No user was not found to make this post." });
      }
    }
  }),
];

export default {
  posts_get,
  post_create,
  post_comment,
};

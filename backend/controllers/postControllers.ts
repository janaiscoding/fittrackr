import express, { Express, Request, Response, NextFunction } from "express";
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
      populate: { path: "user", select: "first_name last_name" }, // + profile pic
    })
    .populate({ path: "user", select: "first_name last_name" }) // + profile pic
    .sort({ createdAt: "desc" })
    .exec();
  if (postsData) {
    res.json({
      message: "HOMEPAGE POSTS | PROTECTED.",
      posts: postsData.map((post) => {
        post.text = validator.unescape(post.text);
        return post;
      }),
    });
  } else {
    res.status(404).json({ info: "No posts yet." });
  }
});

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
    const { text } = req.body;
    const { userID } = req.params;
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
          likes: [],
        });
        Promise.all([
          newPost.save(),
          user.updateOne({ $push: { posts: newPost } }),
        ])
          .then(() => {
            res.status(200).json({
              info: "New post created, post and user models updated.",
            });
          })
          .catch((err) => {
            res.status(500).json({ info: err.message });
          });
      } else {
        res.json({ info: "No user was not found to make this post." });
      }
    }
  }),
];


const post_get = async (req: Request, res: Response, next: NextFunction) => {
  const { postID } = req.params;
  try {
    const post = await Post.findById(postID).populate("comments");
    if (post) {
      post.text = validator.unescape(post.text);
      res.json({ post });
    } else {
      res.status(404).json({ info: "This post doesn't exist" });
    }
  } catch {
    res.status(404).json({ info: "This post doesn't exist" });
  }
};

const post_update = [
  body("updatedText")
    .trim()
    .exists()
    .withMessage("Post must be present")
    .isLength({ min: 5 })
    .withMessage("Post must be at least 5 characters long.")
    .isLength({ max: 300 })
    .withMessage("Post must be maximum 300 characters long.")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const { postID, userID } = req.params;
    const { updatedText } = req.body;
    const errors = validationResult(req);

    const post = await Post.findById(postID);
    const user = await User.findById(userID);

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
        text: validator.unescape(updatedText),
      });
    } else {
      // console.log(post.user === user._id)
      if (post && user) {
        await Post.findByIdAndUpdate(postID, {
          text: updatedText,
        });
        res.json({ info: "Post was successfully updated!" });
      } else {
        res.status(403).json({ info: "You cannot edit this post." });
      }
    }
  }),
];

const post_delete = asyncHandler(async (req, res, next) => {
  const { postID, userID } = req.params;
  const post = await Post.findById(postID);
  const user = await User.findById(userID);
  if (post && user) {
    // Clean-up sequence
    const comments = post.comments;
    for (const comment of comments) {
      await Comment.findByIdAndDelete(comment);
    }
    Promise.all([
      post.deleteOne(),
      User.findByIdAndUpdate(userID, { $pull: { posts: postID } }),
    ])
      .then(() => {
        res.status(200).json({ info: "Post was deleted successfully!" });
      })
      .catch((err) => {
        res.status(500).json({ info: err.message });
      });
  } else {
    res.status(404).json({ info: "You cannot delete this post." });
  }
});

const post_like = asyncHandler(async (req, res, next) => {
  const { postID, userID }: any = req.params;
  const post = await Post.findById(postID);
  if (post) {
    if (post.likes.includes(userID)) {
      //@ts-ignore
      await post.updateOne({ $pull: { likes: userID } });
      res.json({ info: `${userID} has disliked post ${postID}` });
    } else {
      await post.updateOne({ $push: { likes: userID } });
      res.json({ info: `${userID} has liked post ${postID}` });
    }
  } else {
    res.status(404).json({ info: "Post was not found!" });
  }
});
export default {
  posts_get,
  post_get,
  post_create,
  post_update,
  post_delete,
  post_like,
};

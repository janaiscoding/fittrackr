import { Request, Response } from "express";
import Post from "../models/post";
import Comment from "../models/comment";
import { body, validationResult } from "express-validator";
import validator from "validator";
import User from "../models/user";

//Add pic + user pics
const posts_get = async (req: Request, res: Response) => {
  try {
    const postsData = await Post.find({})
      .select("text comments likes createdAt")
      .populate({
        path: "comments",
        select: "text likes createdAt",
        populate: { path: "user", select: "first_name last_name avatar" },
      })
      .populate({ path: "user", select: "first_name last_name avatar" })
      .sort({ createdAt: "desc" })
      .exec();
    if (postsData) {
      res.json({
        posts: postsData.map((post) => {
          post.text = validator.unescape(post.text);
          return post;
        }),
      });
    } else {
      res.status(404).json({ message: "No posts yet." });
    }
  } catch {
    res.status(404).json({ message: "No posts yet." });
  }
};

// Add pic + user pics --- might not need this after all :D
const post_get = async (req: Request, res: Response) => {
  const { postID } = req.params;
  try {
    const post = await Post.findById(postID)
      .populate({
        path: "comments",
        select: "text likes createdAt",
        populate: { path: "user", select: "first_name last_name" }, // + profile pic
      })
      .populate({ path: "user", select: "first_name last_name" }); // + profile pic
    if (post) {
      post.text = validator.unescape(post.text);
      res.json({ post });
    } else {
      res.status(404).json({ message: "This post doesn't exist" });
    }
  } catch {
    res.status(404).json({ message: "This post doesn't exist." });
  }
};

// - Add pic + user pics
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
  async (req: Request, res: Response) => {
    const { text } = req.body;
    const { userID } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
        text: validator.unescape(text),
      });
    }

    try {
      const user = await User.findById(userID); // Get the post writer
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
        ]).then(() => {
          res.status(200).json({
            message: "Post was created successfully.",
          });
        });
      } else {
        res
          .status(404)
          .json({ message: "No user was not found to make this post." });
      }
    } catch {
      res
        .status(404)
        .json({ message: "No user was not found to make this post." });
    }
  },
];

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
  async (req: Request, res: Response) => {
    const { postID, userID } = req.params;
    const { updatedText } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
        text: validator.unescape(updatedText),
      });
    }
    try {
      const post = await Post.findById(postID);
      const user = await User.findById(userID);
      if (post && user && post.user?.equals(userID)) {
        await post
          .updateOne({
            text: updatedText,
          })
          .then(() => {
            res.status(200).json({ message: "Post was successfully updated!" });
          });
      } else {
        res.status(403).json({ message: "You cannot edit this post." });
      }
    } catch {
      res.status(404).json({ message: "This post doesn't exist." });
    }
  },
];

const post_delete = async (req: Request, res: Response) => {
  const { postID, userID } = req.params;
  try {
    const post = await Post.findById(postID);
    const user = await User.findById(userID);

    if (post && user && post.user?.equals(userID)) {
      // Clean-up comments just for the sake of clean DB
      const comments = post.comments;
      for (const comment of comments) {
        await Comment.findByIdAndDelete(comment);
      }
      Promise.all([
        post.deleteOne(),
        user.updateOne({ $pull: { posts: postID } }),
      ])
        .then(() => {
          res.status(200).json({ message: "Post was deleted successfully!" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      res.status(404).json({ message: "You cannot delete this post." });
    }
  } catch {
    res.status(404).json({ message: "You cannot delete this post." });
  }
};

const post_like = async (req: Request, res: Response) => {
  const { postID, userID }: any = req.params;
  try {
    const post = await Post.findById(postID);
    if (post) {
      if (post.likes.includes(userID)) {
        await post.updateOne({ $pull: { likes: userID } });
        res.json({ message: `${userID} has disliked post ${postID}` });
      } else {
        await post.updateOne({ $push: { likes: userID } });
        res.json({ message: `${userID} has liked post ${postID}` });
      }
    } else {
      res.status(404).json({ message: "Post was not found!" });
    }
  } catch {
    res.status(404).json({ message: "Post was not found!" });
  }
};

export default {
  posts_get,
  post_get,
  post_create,
  post_update,
  post_delete,
  post_like,
};

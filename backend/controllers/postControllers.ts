import { Request, Response } from "express";
import Post from "../models/post";
import Comment from "../models/comment";
import { body, validationResult } from "express-validator";
import validator from "validator";
import User from "../models/user";
import unescapePost from "../utils/unescapePost";
import upload from "../middleware/multerConfig";

const shortUser = "first_name last_name avatar";

// @route GET /posts
// @access Private
// @description Gets all posts.
const posts_get = async (req: Request, res: Response) => {
  try {
    const postsData = await Post.find({})
      .sort({ createdAt: "desc" })
      .populate({ path: "user", select: shortUser })
      .populate({
        path: "comments",
        options: { sort: { createdAt: "desc" } },
        populate: {
          path: "user",
          select: shortUser,
        },
      });
    if (postsData) {
      const posts = postsData.map((post) => {
        unescapePost(post);
        return post;
      });
      res.json({ posts });
    } else {
      // This only happens when posts is null - as in a DB error
      res.status(404).json({ message: "No posts yet." });
    }
  } catch {
    res.status(404).json({ message: "No posts yet." });
  }
};

// @route GET /posts/:postID
// @access Private
// @description Gets one individual post.
const post_get = async (req: Request, res: Response) => {
  const { postID } = req.params;
  try {
    const post = await Post.findById(postID)
      .populate({
        path: "comments",
        select: "comment likes createdAt",
        options: { sort: { createdAt: "desc" } },
        populate: {
          path: "user",
          select: shortUser,
        },
      })
      .populate({ path: "user", select: shortUser });
    if (post) {
      unescapePost(post);
      res.json({ post });
    } else {
      res.status(404).json({ message: "This post doesn't exist" });
    }
  } catch {
    res.status(404).json({ message: "This post doesn't exist." });
  }
};

// @route POST /posts
// @access Private
// @description Creates one individual post - File upload is optional.
const post_create = [
  upload.single("myImage"),
  body("description", "Post description is required")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Your post description is too short.")
    .isLength({ max: 140 })
    .withMessage("Post description can be maximum 140 characters.")
    .escape(),
  body("userID").notEmpty().withMessage("UserID is required."),
  async (req: Request, res: Response) => {
    const { description, userID } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        description: validator.unescape(description),
      });
    }
    try {
      const user = await User.findById(userID);
      if (user) {
        const newPost = new Post({
          user: userID,
          description,
          image: req.file && {
            url: req.file.path,
            alt: req.file.originalname,
          },
          comments: [],
          likes: [],
        });
        await user.updateOne({ $push: { posts: newPost } });
        await newPost.save();

        res.status(201).json({
          message: "Post was created successfully.",
          newPost,
        });
      } else {
        res.status(404).json({
          message: "No user was not found to make this post.",
        });
      }
    } catch (err: any) {
      res.status(500).json({
        message: "Invalid user. Please sign in to a valid account.",
        err: err,
      });
    }
  },
];

// @route PUT /posts/:postID
// @access Private
// @description Updates one individual post's description.
const post_update = [
  body("uDescription")
    .trim()
    .exists()
    .withMessage("Description must be present")
    .isLength({ min: 1 })
    .withMessage("Description must be at least 1 character long.")
    .isLength({ max: 140 })
    .withMessage("Description must be maximum 140 characters long.")
    .escape(),
  async (req: Request, res: Response) => {
    const { postID } = req.params;
    const { uDescription } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        uDescription: validator.unescape(uDescription),
      });
    }
    
    try {
      // Step 1: Find post and update it
      const post = await Post.findById(postID);
      if (!post) res.status(404).json({ message: "This post doesn't exist." });
      if (post) await post.updateOne({ description: uDescription });
      // Step 2: Return success message
      return res
        .status(202)
        .json({ message: "Post description was successfully updated!" });
    } catch {
      res.status(505).json({ message: "An unexpected error has occured." });
    }
  },
];

// @route DELETE /posts/:postID
// @access Private
// @description Deletes the specified post.
const post_delete = async (req: Request, res: Response) => {
  const { postID } = req.params;
  try {
    const post = await Post.findById(postID);
    if (post) {
      const userID = post.user!._id;
      const user = await User.findById(userID);
      // Clean-up DB - Remove all comments, clean user's records and the post.
      const comments = post.comments;
      for (const comment of comments) {
        await Comment.findByIdAndDelete(comment);
      }
      await user?.updateOne({ $pull: { posts: postID } });
      await post.deleteOne();

      res.status(200).json({
        message: "Post was deleted successfully!",
        deletedPost: post,
      });
    } else {
      res.status(404).json({ message: "This post doesn't exist." });
    }
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occured." });
  }
};

// @route POST /posts/:postID/like
// @access Private
// @description Toggles like status on the specified post - returns the like-list containing all userIDs of likes in that post.
const post_like = async (req: Request, res: Response) => {
  const { postID }: any = req.params;
  const { userID } = req.body;
  try {
    const post = await Post.findById(postID);
    if (post) {
      if (post.likes.includes(userID)) {
        await post.updateOne({ $pull: { likes: userID } });
        const updatedLikes = await Post.findById(postID).select("likes").lean();

        res.status(200).json({ likes: updatedLikes?.likes });
      } else {
        await post.updateOne({ $push: { likes: userID } });
        const updatedLikes = await Post.findById(postID).select("likes").lean();

        res.status(200).json({ likes: updatedLikes?.likes });
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

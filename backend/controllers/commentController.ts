import { Request, Response } from "express";
import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";
import { body, validationResult } from "express-validator";
import validator from "validator";

// @route POST /posts/:postID
// @access Private
// @description Create a comment on a specific post. Returns that comment on success.
const post_comment = [
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is too short.")
    .isLength({ min: 1 })
    .isLength({ max: 140 })
    .withMessage("Comment is too long (max 140 characters).")
    .escape(),
  body("userID").notEmpty().withMessage("UserID is required."),

  async (req: Request, res: Response) => {
    const { comment, userID } = req.body;
    const { postID } = req.params;

    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const post = await Post.findById(postID);
      if (post) {
        const newComment = new Comment({
          user: userID,
          comment,
          likes: [],
        });
        await newComment.save();
        await post.updateOne({ $push: { comments: newComment } });
        return res.status(200).json({
          message: "Comment was successfully sent.",
          newComment,
        });
      } else {
        return res
          .status(404)
          .json({ message: "The user could not be found." });
      }
    } catch {
      return res.status(500).json({ message: "Internal server error." });
    }
  },
];

// @route POST /posts/:postID/:commentID/like
// @access Private
// @description Toggles the like status on a specific comment. Returns the likes array.
const comment_like = async (req: Request, res: Response) => {
  const { postID, commentID }: any = req.params;
  const { userID } = req.body;
  try {
    const post = await Post.findById(postID);
    const comment = await Comment.findById(commentID);
    const user = await User.findById(userID);
    // Checks if everything is valid.
    if (post && comment && user) {
      // Case 1: The user already has liked this post. Remove the like.
      if (comment.likes.includes(userID)) {
        await comment.updateOne({ $pull: { likes: userID } });

        const updatedLikes = await Comment.findById(commentID)
          .select("likes")
          .lean();

        return (
          updatedLikes &&
          res.status(201).json({
            message: "You disliked this comment",
            likes: updatedLikes.likes,
          })
        );
      } else {
        // Case 2: Add the new like to the array of existing likes.
        await comment.updateOne({ $push: { likes: userID } });

        const updatedLikes = await Comment.findById(commentID)
          .select("likes")
          .lean();
        return (
          updatedLikes &&
          res.status(201).json({
            message: "You liked this comment",
            likes: updatedLikes.likes,
          })
        );
      }
    } else {
      res.status(404).json({ message: "The comment was not found!" });
    }
  } catch {
    res.status(404).json({ message: "The comment was not found!" });
  }
};

// @route DELETE /posts/:postID/:commentID
// @access Private
// @description Deletes one comment from the post.
const comment_delete = async (req: Request, res: Response) => {
  const { postID, commentID }: any = req.params;
  try {
    const comment = await Comment.findById(commentID);
    const post = await Post.findById(postID);
    if (comment && post) {
      await comment.deleteOne();
      await post.updateOne({ $pull: { comments: commentID } });

      return res.status(200).json({
        message: "Comment was successfully deleted",
        comment,
      });
    } else {
      res.json({ message: "You cannot delete this comment." });
    }
  } catch {
    res.status(404).json({ message: "The comment was not found!" });
  }
};

export default {
  post_comment,
  comment_like,
  comment_delete,
};

import { Request, Response } from "express";
import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";
import { body, validationResult } from "express-validator";
import validator from "validator";

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
  async (req: Request, res: Response) => {
    const { text } = req.body;

    const { postID, commentatorID } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
        text: validator.unescape(text),
      });
    }

    try {
      const user = await User.findById(commentatorID);
      const post = await Post.findById(postID);
      if (user && post) {
        const comment = new Comment({
          user: commentatorID,
          text,
          likes: [],
        });
        Promise.all([
          comment.save(),
          post.updateOne({ $push: { comments: comment } }),
        ])
          .then(() => {
            res.status(200).json({
              message: "Comment was successfully sent.",
              comment,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err.message,
            });
          });
      } else {
        res.status(404).json({ message: "The user could not be found." });
      }
    } catch {
      res.status(500).json({ message: "Internal server error." });
    }
  },
];

const comment_like = async (req: Request, res: Response) => {
  const { postID, commentID, userID }: any = req.params;
  try {
    const post = await Post.findById(postID);
    const comment = await Comment.findById(commentID);
    const user = await User.findById(userID);
    // All NEED to be valid
    if (post && comment && user) {
      if (comment.likes.includes(userID)) {
        await comment.updateOne({ $pull: { likes: userID } });
        res.json({
          message: `${user.first_name} has disliked  comment: ${comment.text}`,
        });
      } else {
        await comment.updateOne({ $push: { likes: userID } });
        res.json({
          message: `${user.first_name} has liked comment: ${comment.text}`,
        });
      }
    } else {
      res.status(404).json({ message: "The comment was not found!" });
    }
  } catch {
    res.status(404).json({ message: "The comment was not found!" });
  }
};

const comment_delete = async (req: Request, res: Response) => {
  const { postID, commentID, commentatorID }: any = req.params;
  try {
    const comment = await Comment.findById(commentID);
    const post = await Post.findById(postID);

    if (comment && post && comment.user?._id.equals(commentatorID)) {
      Promise.all([
        comment.deleteOne(),
        post.updateOne({ $pull: { comments: commentID } }),
      ])
        .then(() => {
          res.status(200).json({ message: "Comment was successfully deleted" });
        })
        .catch((err: any) => {
          res.status(400).json({ message: err.message });
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

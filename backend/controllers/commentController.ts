import Post from "../models/post";
import Comment from "../models/comment";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import validator from "validator";
import User from "../models/user";

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
  asyncHandler(async (req, res, next) => {
    const { text } = req.body;
    const { postID, userID } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
        text: validator.unescape(text),
      });
    } else {
      const user = await User.findById(userID).exec();
      const post = await Post.findById(postID).exec();
      if (user && post) {
        const comment = new Comment({
          user: userID,
          text,
          likes: [],
        });
        await comment.save();
        //@ts-ignore
        post.comments.push(comment);
        await post.save();
        res.json({
          comment,
          info: "Comment was posted successfully",
        });
      } else {
        res.json({ info: "No user was not found to make this post." });
      }
    }
  }),
];

const comment_like = asyncHandler(async (req, res, next) => {
  const { postID, userID, commentID }: any = req.params;
  const comment = await Comment.findById(commentID);
  if (comment) {
    if (comment.likes.includes(userID)) {
      //@ts-ignore
      comment.likes.pull(userID);
      await comment.save();
      res.json({ info: `${userID} has disliked comment ${commentID}` });
    } else {
      comment.likes.push(userID);
      await comment.save();
      res.json({ info: `${userID} has liked comment ${commentID}` });
    }
  } else {
    res.status(404).json({ info: "Comment was not found!" });
  }
});

export default {
  post_comment,
  comment_like,
};

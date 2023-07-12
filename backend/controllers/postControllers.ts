import Post from "../models/post";
import Comment from "../models/comment";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import validator from "validator";
import User from "../models/user";

const posts_get = asyncHandler(async (req, res, next) => {
  const postsData = await Post.find({}).populate({ path: 'user', select: 'first_name last_name' }).sort({createdAt: 'desc'}).exec() //maybe not get the full user?

  res.json({ 
  message: "PROTECTED ROUTE WAS ACCESSED", 
  postsData:  postsData.map((post)=>{
    post.text = validator.unescape(post.text)
    return post;
  }), 
  info: "User, User's Friends latest posts - mayber user friends, -settigs -button -logout -delete acc"
  });
});
const post_comment = [
  body('text')
  .trim()
  .exists().withMessage('Comment is required.')
  .isLength({min:5 }).withMessage("Comment must be at least 5 characters long.")
  .isLength({max:300}).withMessage("Comment must be maximum 300 characters long")
  .escape(),
  body("user")
  .trim().exists()
  ,asyncHandler(async(req,res,next) =>{
  const {user, text} = req.body;
  const post = await Post.findById(req.params.id);
  const postComments = post?.comments;
  const comment = new Comment({
    user, 
    text, 
    likes: 0,
  })
  await comment.save();
  //@ts-ignore
  postComments?.push(comment)
  await Post.findByIdAndUpdate(req.params.id, {comments: postComments})
  res.json({postComments, info:"individual post, post req, comment"})
})]
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
  post_create,
  post_comment
};

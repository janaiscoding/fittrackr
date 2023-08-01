/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Comment, Post } from "../__types__/types";
import { UserContext } from "../context/userContext";
import CommentForm from "./forms/CommentForm";
import getPostComments from "../api/posts/get_post_comments";
import UIComment from "./comments/UIComment";
import PostStats from "./posts/PostStats";
import PostContent from "./posts/PostContent";

const PostArticle = ({ post }: { post: Post }) => {
  const [refr, setRefr] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments); // Set initial comments
  console.log(post)
  useEffect(() => {
    getPostComments(post._id, setComments);
    // Update everytime the comment form is successful
  }, [refr]);

  return (
    <article className="border border-mid-green p-4 mt-4" id={post._id}>
      <PostContent post={post} />
      <PostStats post={post} />
      <CommentForm
        postID={post._id}
        refr={refr}
        setRefr={setRefr}
      />
      {comments.map((c) => (
        <UIComment key={c._id} comment={c} />
      ))}
    </article>
  );
};

export default PostArticle;

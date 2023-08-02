/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Comment, Post } from "../../__types__/types";
import { UserContext } from "../../context/userContext";
import Author from "./Author";
import PostContent from "./PostContent";
import Comments from "./Comments";
import { PostsContext } from "@/app/context/postsContext";

const PostArticle = ({ post }: { post: Post }) => {
  const [comments, setComments] = useState<Comment[]>([] as Comment[]); // Set initial comments
  const [isSame, setIsSame] = useState<boolean>();
  const [isLiked, setIsLiked] = useState<boolean>();

  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);
  //TODO: MODALS.

  useEffect(() => {
    // Declare author and liked status on initial loads and re-renders based on postsContext
    if (userContext.user) {
      setIsSame(post.user._id === userContext.user._id);
      setIsLiked(post.likes.includes(userContext.user._id));
    }
    // Also the fresh comments on each post creation.
    setComments(post.comments);
  }, [postsContext.posts]);

  return (
    <article id={post._id} className="bg-blue rounded py-2 md:max-w-lg">
      <Author post={post} isSame={isSame} />
      <PostContent
        post={post}
        comments={comments}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />
      <Comments post={post} comments={comments} setComments={setComments} />
    </article>
  );
};

export default PostArticle;

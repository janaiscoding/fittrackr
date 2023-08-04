/* eslint-disable react-hooks/exhaustive-deps */
import { Comment, Post } from "@/app/__types__/types";
import { getJwtToken } from "@/app/api/auth/auth_handler";
import likePost from "@/app/api/posts/like_post";
import getUsername from "@/app/api/users/get_username";
import CommentSVG from "@/app/assets/svgs/CommentSVG";
import Like from "@/app/assets/svgs/Like";
import LikeFilled from "@/app/assets/svgs/LikeFilled";
import { PostsContext } from "@/app/context/postsContext";
import { UserContext } from "@/app/context/userContext";
import React, { SetStateAction, useContext, useEffect, useState } from "react";

type PostStatsProps = {
  post: Post;
};
const PostStats = ({ post }: PostStatsProps) => {
  const { _id, comments } = post;
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likenames, setLikenames] = useState<string[]>([] as string[]);
  const [showNames, setShowNames] = useState(false);
  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);

  const handleLike = () => {
    likePost(_id, userContext.user?._id, handleSuccess);
  };
  const handleSuccess = (data: { likes: string[] }) => {
    post.likes = data.likes;
    setIsLiked(!isLiked);
  };
  const getLikeNames = () => {
    setLikenames([]);
    post.likes.forEach((userID) => getUsername(userID, setLikenames));
  };

  useEffect(() => {
    getLikeNames();
  }, [post.likes]);

  useEffect(() => {
    if (userContext.user) {
      setIsLiked(post.likes.includes(userContext.user._id));
    }
  }, [userContext.user, postsContext.posts]);

  return (
    <div className="flex items-start mt-2 gap-2 relative">
      <div>
        {showNames && likenames.length > 0 && (
          <div className="hidden md:block absolute p-2 top-[100%] left-[7%] rounded bg-blue border border-solid border-slate-900 text-yellow">
            {likenames.map((name, i) => (
              <p key={i}>{name}</p>
            ))}
          </div>
        )}
        <div
          onClick={handleLike}
          className="hover:cursor-pointer"
          aria-label="Toggle like button"
        >
          {isLiked ? <LikeFilled /> : <Like />}
        </div>
        <div
          className="text-white2 font-ubuntu-500 text-sm hover:cursor-pointer"
          onMouseEnter={() => setShowNames(true)}
          onMouseLeave={() => setShowNames(false)}
        >
          {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
        </div>
      </div>
      <div aria-label="Comment icon and comment count">
        <CommentSVG />
        <div className="text-white2 font-ubuntu-500 text-sm">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </div>
      </div>
    </div>
  );
};

export default PostStats;

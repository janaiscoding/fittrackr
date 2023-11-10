/* eslint-disable react-hooks/exhaustive-deps */
import likePost from "@/app/utils/api/posts/like_post";
import CommentSVG from "@/app/utils/assets/svgs/CommentSVG";
import Like from "@/app/utils/assets/svgs/Like";
import LikeFilled from "@/app/utils/assets/svgs/LikeFilled";
import { PostsContext } from "@/app/context/postsContext";
import { UserContext } from "@/app/context/userContext";
import React, { useContext, useEffect, useState } from "react";
import { Post } from "@/app/utils/types";
import debounce from "lodash.debounce";

const PostStats = ({ post }: { post: Post }) => {
  const { _id, comments } = post;
  const [likes, setLikes] = useState(post.likes);

  const [isLiked, setIsLiked] = useState<boolean>();
  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);

  const handleLike = () => {
    likePost(_id, userContext.user?._id, handleSuccess);
  };

  const handleSuccess = (data: { likes: string[] }) => {
    setLikes(data.likes);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    if (userContext.user) {
      setIsLiked(post.likes.includes(userContext.user._id));
      setLikes(post.likes);
    }
  }, [postsContext, userContext]);

  const focusInput = () => {
    const commentFormInput = document.getElementById(`comment-form-${_id}`);
    commentFormInput?.focus();
  };

  const debounceRequest = debounce(() => handleLike(), 500);
 
  return (
    <div className="flex items-start mt-2 gap-2 relative">
      <div>
        <button
          aria-label="Toggle on/off like for this post"
          onClick={debounceRequest}
        >
          {isLiked ? <LikeFilled /> : <Like />}
        </button>

        <div className="text-white2 font-ubuntu-500">
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </div>
      </div>
      <div aria-label="Comment icon and comment count">
        <button
          aria-label="Focus comment input for writing a new comment"
          onClick={focusInput}
        >
          <CommentSVG />
        </button>
        <div className="text-white2 font-ubuntu-500">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </div>
      </div>
    </div>
  );
};

export default PostStats;

/* eslint-disable react-hooks/exhaustive-deps */
import { Comment, Post } from "@/app/__types__/types";
import likePost from "@/app/api/posts/like_post";
import CommentSVG from "@/app/assets/svgs/CommentSVG";
import Like from "@/app/assets/svgs/Like";
import LikeFilled from "@/app/assets/svgs/LikeFilled";
import { PostsContext } from "@/app/context/postsContext";
import { UserContext } from "@/app/context/userContext";
import { SetStateAction, useContext, useEffect, useState } from "react";

type PostStatsProps = {
  post: Post;
};
const PostStats = ({ post }: PostStatsProps) => {
  const { _id, comments } = post;
  const [isLiked, setIsLiked] = useState<boolean>();

  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);

  const handleLike = () => {
    likePost(_id, userContext.user?._id, handleSuccess);
  };
  const handleSuccess = (data: { likes: string[] }) => {
    post.likes = data.likes;
    setIsLiked(!isLiked);
  };
  useEffect(() => {
    if (userContext.user) {
      setIsLiked(post.likes.includes(userContext.user._id));
    }
  }, [postsContext.posts]);

  return (
    <div className="flex items-start mt-2 gap-2">
      <div>
        <div
          onClick={handleLike}
          className="hover:cursor-pointer"
          aria-label="Toggle like button"
        >
          {isLiked ? <LikeFilled /> : <Like />}
        </div>
        <div className="text-white2 font-ubuntu-500 text-sm">
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

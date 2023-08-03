import { Avatar, Comment, Post, ShortUser } from "@/app/__types__/types";
import { getJwtToken } from "@/app/api/auth/auth_handler";
import { UserContext } from "@/app/context/userContext";
import { SetStateAction, useContext } from "react";
import PostImage from "./PostImage";
import PostStats from "./PostStats";
import likePost from "@/app/api/posts/like_post";

type PostContentProps = {
  post: Post;
  isLiked: boolean | undefined;
  setIsLiked: React.Dispatch<SetStateAction<boolean | undefined>>;
};

const PostContent = ({ post, isLiked, setIsLiked }: PostContentProps) => {
  const { text, user, image } = post;

  return (
    <div>
      <p className="font-ubuntu px-4 mb-2 text-white break-all max-w-sm">
        {text}
      </p>
      <PostImage user={user} image={image} />
      <div className="px-4 border-solid border-b border-grey pb-2">
        <PostStats post={post} />
      </div>
    </div>
  );
};

export default PostContent;

import { Post } from "@/app/utils/types";
import PostImage from "./PostImage";
import PostStats from "./PostStats";
import React, { SetStateAction } from "react";

type PostContentProps = {
  post: Post;
};

const PostContent = ({ post }: PostContentProps) => {
  const { description, image } = post;

  return (
    <div aria-label="post-content-section">
      <p className="font-ubuntu px-2 my-2 text-lg break-all">
        {description}
      </p>
      {post.image && <PostImage image={image} />}
      <div className="px-4 border-solid border-b border-black/10 dark:border-gray-300/10 pb-2">
        <PostStats post={post} />
      </div>
    </div>
  );
};

export default PostContent;

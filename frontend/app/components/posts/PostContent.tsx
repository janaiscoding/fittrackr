
import { Post } from "@/app/utils/types";
import PostImage from "./PostImage";
import PostStats from "./PostStats";

type PostContentProps = {
  post: Post;
};

const PostContent = ({ post }: PostContentProps) => {
  const { description, image } = post;

  return (
    <div aria-label="post-content-section">
      <p className="font-ubuntu px-2 my-2 text-lg text-secondary break-all max-w-sm">
        {description}
      </p>
      <PostImage image={image} />
      <div className="px-4 border-solid border-b border-black/10 pb-2">
        <PostStats post={post} />
      </div>
    </div>
  );
};

export default PostContent;

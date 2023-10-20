
import { Post } from "@/app/utils/types";
import PostImage from "./PostImage";
import PostStats from "./PostStats";

type PostContentProps = {
  post: Post;
};

const PostContent = ({ post }: PostContentProps) => {
  const { text, user, image } = post;

  return (
    <div aria-label="post-content-section">
      <p className="font-ubuntu px-4 my-2 text-secondary break-all max-w-sm">
        {text}
      </p>
      <PostImage user={user} image={image} />
      <div className="px-4 border-solid border-b border-black/10 pb-2">
        <PostStats post={post} />
      </div>
    </div>
  );
};

export default PostContent;

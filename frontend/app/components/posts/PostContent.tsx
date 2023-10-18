
import { Post } from "@/app/utils/types";
import PostImage from "./PostImage";
import PostStats from "./PostStats";

type PostContentProps = {
  post: Post;
};

const PostContent = ({ post }: PostContentProps) => {
  const { text, user, image } = post;

  return (
    <div>
      <p className="font-ubuntu px-4 my-2 text-white break-all max-w-sm">
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

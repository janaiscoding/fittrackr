/* eslint-disable react-hooks/exhaustive-deps */
import Author from "./Author";
import PostContent from "./PostContent";
import Comments from "../comments/Comments";
import { Post } from "@/app/utils/types";

const PostArticle = ({ post }: { post: Post }) => {
  const { _id, user, comments, createdAt } = post;

  return (
    <article className="bg-bgContainers drop-shadow py-2 w-full">
      <Author postID={_id} author={user} createdAt={createdAt} />
      <PostContent post={post} />
      <Comments postID={_id} postComments={comments} />
    </article>
  );
};

export default PostArticle;

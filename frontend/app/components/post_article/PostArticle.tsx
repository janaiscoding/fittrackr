/* eslint-disable react-hooks/exhaustive-deps */
import { Post } from "../../utils/__types__/types";
import Comments from "../comments/Comments";
import Author from "./Author";
import PostContent from "./PostContent";

const PostArticle = ({ post }: { post: Post }) => {
  const { _id, user, comments, createdAt } = post;

  return (
    <article className="bg-blue rounded py-2 w-full">
      <Author postID={_id} author={user} createdAt={createdAt} />
      <PostContent post={post} />
      <Comments postID={_id} postComments={comments} />
    </article>
  );
};

export default PostArticle;

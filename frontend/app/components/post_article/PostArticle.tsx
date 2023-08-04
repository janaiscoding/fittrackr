/* eslint-disable react-hooks/exhaustive-deps */
import { Post } from "../../__types__/types";
import Author from "./Author";
import PostContent from "./PostContent";
import Comments from "./Comments";

const PostArticle = ({ post }: { post: Post }) => {
  const { _id, user, comments, createdAt } = post;

  return (
    <article className="bg-blue rounded py-2 md:max-w-lg">
      <Author postID={_id} author={user} createdAt={createdAt} />
      <PostContent post={post} />
      <Comments postID={_id} postComments={comments} />
    </article>
  );
};

export default PostArticle;
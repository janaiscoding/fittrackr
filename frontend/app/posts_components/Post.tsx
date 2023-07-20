import { Post } from "../utils/types/types";

const PostComponent = ({ post }: {post: Post}) => {

  return (
    <article>
      <h1> {post.text}</h1>
      {/* <ProfilePicture userData={post.user} /> */}
    </article>
  );
};
export default PostComponent;

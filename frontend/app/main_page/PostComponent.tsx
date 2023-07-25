import { Post } from "../__types__/types";
import Date from "../ui_components/post_components/Date";

const PostComponent = ({ post }: { post: Post }) => {
  const { _id, text, comments, user, createdAt, image, likes } = post;
  return (
    <div>
      <a className="text-green" href={`/users/${user._id}`}>
        {user.first_name} {user.last_name}
      </a>
      <Date date={createdAt} />
      <p>{text}</p>
    </div>
  );
};

export default PostComponent;

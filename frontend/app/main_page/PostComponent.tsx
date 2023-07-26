import { useContext } from "react";
import { Post } from "../__types__/types";
import { Date } from "../ui_components/Date";
import { UserContext } from "../context/userContext";

const PostComponent = ({ post }: { post: Post }) => {
  const { _id, text, comments, user, createdAt, image, likes } = post;
  const userContext = useContext(UserContext);
  return (
    <article className="border border-mid-green p-4 mt-4">
      <div className="flex justify-between">
        <div>
          <a className="text-green" href={`/users/${user._id}`}>
            {user.first_name} {user.last_name}
          </a>
          <Date date={createdAt} />
        </div>
        <p>{userContext.user?._id === user._id && "Delete"}</p>
      </div>
      <p>{text}</p>
      <div className="flex justify-between">
      <p>{likes.length} likes </p>
      <p>{comments.length} comments</p>
      </div>
    </article>
  );
};

export default PostComponent;

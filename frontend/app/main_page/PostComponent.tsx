import { useContext, useEffect, useState } from "react";
import { Post } from "../__types__/types";
import { Date } from "../ui_components/Date";
import { UserContext } from "../context/userContext";
import { FcDislike, FcLike } from "react-icons/fc";
import { BiCommentDots } from "react-icons/bi";
import { getJwtToken } from "../api/auth_handler";
import getPost from "../api/get_post";

const PostComponent = ({ post }: { post: Post }) => {
  const { _id, comments, text, user, image, createdAt } = post;
  const userContext = useContext(UserContext);
  const [isLiked, setIsLiked] = useState<boolean>();
  const [render, setRender] = useState<boolean>();

  const handleLike = async () => {
    await fetch(`https://fiturself.fly.dev/posts/${_id}/like`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      body: JSON.stringify({ userID: userContext.user?._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        post.likes = data.likes;
        setIsLiked(!isLiked);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (userContext.user) {
      setIsLiked(post.likes.includes(userContext.user?._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext]);

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
      <div className="flex justify-between text-green">
        <div className="flex items-center gap-1">
          <p>{post.likes.length}</p>{" "}
          {isLiked ? (
            <FcDislike onClick={handleLike} />
          ) : (
            <FcLike onClick={handleLike} />
          )}
        </div>
        <div className="flex items-center gap-1">
          <p>{comments.length}</p> <BiCommentDots />
        </div>
      </div>
    </article>
  );
};

export default PostComponent;

import { useContext, useEffect, useState } from "react";
import { Post } from "../__types__/types";
import { Date } from "./Date";
import { UserContext } from "../context/userContext";
import { FcDislike, FcLike } from "react-icons/fc";
import { BiCommentDots } from "react-icons/bi";
import { getJwtToken } from "../api/auth_handler";
import getPost from "../api/get_post";
import Delete from "../assets/svgs/Delete";
import DeleteSVG from "../assets/svgs/DeleteSVG";
import deletePost from "../api/delete_post";

const PostComponent = ({ post }: { post: Post }) => {
  const { _id, comments, text, user, image, createdAt } = post;

  const userContext = useContext(UserContext);
  const [isLiked, setIsLiked] = useState<boolean>();

  const [isOpen, setOpen] = useState(false);

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

  const handleDelete = () => {
    deletePost(_id).then(() => {
      const element = document.getElementById(_id);
      element?.remove();
    });
    // or perform a fetch again?
  };
  useEffect(() => {
    if (userContext.user) {
      setIsLiked(post.likes.includes(userContext.user?._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext]);

  return (
    <article className="border border-mid-green p-4 mt-4" id={_id}>
      <div className="flex justify-between">
        <div>
          <a className="text-green" href={`/users/${user._id}`}>
            {user.first_name} {user.last_name}
          </a>
          <Date date={createdAt} />
        </div>
        <div onClick={() => setOpen(true)}>
          {userContext.user?._id === user._id && <DeleteSVG />}
        </div>
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
      {isOpen && (
        <div>
          <p> Are you sure you want to delete this?</p>
          <button onClick={handleDelete}>yes</button>
          <button onClick={() => setOpen(false)}>cancel</button>
        </div>
      )}
    </article>
  );
};

export default PostComponent;

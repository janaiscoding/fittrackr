import { FcDislike, FcLike } from "react-icons/fc";
import { BiCommentDots } from "react-icons/bi";
import { Post } from "@/app/__types__/types";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import { getJwtToken } from "@/app/api/auth/auth_handler";


const PostStats = ({ post }: { post: Post }) => {
  const userContext = useContext(UserContext);
  const [isLiked, setIsLiked] = useState<boolean>();

  useEffect(() => {
    if (userContext.user) {
      setIsLiked(post.likes.includes(userContext.user?._id));
    }
  }, [post.likes, userContext]);

  const handleLike = () => {
    fetch(`https://fiturself.fly.dev/posts/${post._id}/like`, {
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

  return (
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
        <p>{post.comments.length}</p> <BiCommentDots />
      </div>
    </div>
  );
};

export default PostStats;

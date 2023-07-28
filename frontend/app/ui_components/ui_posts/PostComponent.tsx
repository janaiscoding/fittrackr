import { useContext, useEffect, useState } from "react";
import { Comment, Post } from "../../__types__/types";
import { Date } from "../Date";
import { UserContext } from "../../context/userContext";
import { FcDislike, FcLike } from "react-icons/fc";
import { BiCommentDots } from "react-icons/bi";
import { getJwtToken } from "../../api/auth_handler";
import DeleteSVG from "../../assets/svgs/DeleteSVG";
import deletePost from "../../api/delete_post";
import CommunityPicture from "../CommunityPicture";
import CommentForm from "./CommentForm";
import getPostComments from "../../api/get_post_comments";
import UIComment from "./UIComment";

const PostComponent = ({ post }: { post: Post }) => {
  const { _id, text, user, image, createdAt } = post;

  const userContext = useContext(UserContext);

  const [refr, setRefr] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isOpen, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);

  const handleLike = () => {
    fetch(`https://fiturself.fly.dev/posts/${_id}/like`, {
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
  };

  useEffect(() => {
    if (userContext.user) {
      setIsLiked(post.likes.includes(userContext.user?._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext]);
  useEffect(() => {
    getPostComments(_id, setComments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refr]);

  return (
    <article className="border border-mid-green p-4 mt-4" id={_id}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <CommunityPicture avatar={user.avatar} userID={user._id} />
          <div>
            <a className="text-green text-xl" href={`/users/${user._id}`}>
              {user.first_name} {user.last_name}
            </a>
            <Date date={createdAt} />
          </div>
        </div>
        <div onClick={() => setOpen(true)}>
          {userContext.user?._id === user._id && <DeleteSVG />}
        </div>
        {isOpen && (
          <div className="absolute top-50 left-50 bg-black text-green flex flex-col">
            <p> Are you sure you want to delete this?</p>
            <div className="flex gap-2">
              <button onClick={handleDelete}>yes</button>
              <button onClick={() => setOpen(false)} className="text-red">
                cancel
              </button>
            </div>
          </div>
        )}
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
          <p>{post.comments.length}</p> <BiCommentDots />
        </div>
      </div>
      <CommentForm
        postID={_id}
        userID={userContext.user!._id}
        refr={refr}
        setRefr={setRefr}
      />

      {comments.map((c) => (
        <UIComment key={c._id} comment={c} />
      ))}
    </article>
  );
};

export default PostComponent;

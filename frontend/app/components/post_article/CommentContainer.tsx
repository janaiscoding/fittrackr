/* eslint-disable react-hooks/exhaustive-deps */
import DeleteSVG from "@/app/assets/svgs/DeleteSVG";
import Like from "@/app/assets/svgs/Like";
import LikeFilled from "@/app/assets/svgs/LikeFilled";
import AvatarComment from "./AvatarComment";
import { Date } from "../Date";
import { SetStateAction, useContext, useEffect, useState } from "react";
import deleteComment from "@/app/api/posts/delete_comment";
import { getJwtToken } from "@/app/api/auth/auth_handler";
import { UserContext } from "@/app/context/userContext";
import { Comment } from "@/app/__types__/types";

const CommentContainer = ({
  postID,
  comm,
  refresher,
  setRefresher,
}: {
  postID: string;
  comm: Comment;
  refresher: boolean | null;
  setRefresher: React.Dispatch<SetStateAction<boolean | null>>;
}) => {
  const { comment, user, _id, createdAt } = comm;
  const userContext = useContext(UserContext);
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isSame, setIsSame] = useState<boolean>();

  const handleLike = () => {
    fetch(`https://fiturself.fly.dev/posts/${postID}/${_id}/like`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      body: JSON.stringify({ userID: userContext.user?._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        comm.likes = data.likes;
        setIsLiked(!isLiked);
      })
      .catch((err) => console.log(err));
  };
  const openModal = () => {
    console.log("open delete modal");
    handleDeleteComment();
  };
  const handleDeleteComment = () => {
    //delete comment
    deleteComment(postID, _id, userContext.user?._id, handleSuccessDELETE);
  };
  const handleSuccessDELETE = () => {
    setRefresher(!refresher);
    // Updating comments with a GET post/:id/ request - sadly 2 API calls, but optimistic UI was throwing an error related to React re-rendering if I deleted and then posted a new comment.
  };
  useEffect(() => {
    if (comment && userContext.user) {
      setIsLiked(comm.likes.includes(userContext.user!._id));
      setIsSame(userContext.user._id === user._id);
    }
  }, [userContext.user]);

  return (
    <div id={_id}>
      <div className="flex justify-between">
        <div className="flex gap-1 items-center">
          <div className="flex flex-col">
            <div className="flex gap-1 items-center">
              <AvatarComment avatar={user.avatar} userID={user._id} />
              <a
                href={`/users/${user._id}`}
                className="text-white text-sm hover:text-yellow"
              >
                {user.first_name} {user.last_name}
              </a>
              <Date date={createdAt} />
            </div>
            <p className="text-white2 break-all ml-8"> {comment}</p>
          </div>
        </div>
        <div className="flex gap-1 items-start">
          <button onClick={handleLike} aria-label="Like comment toggle icon">
            {isLiked ? <LikeFilled /> : <Like />}
          </button>
          <button onClick={openModal} aria-label="Delete this comment">
            {isSame && <DeleteSVG />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentContainer;

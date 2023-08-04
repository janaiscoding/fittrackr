/* eslint-disable react-hooks/exhaustive-deps */
import DeleteSVG from "@/app/assets/svgs/DeleteSVG";
import Like from "@/app/assets/svgs/Like";
import LikeFilled from "@/app/assets/svgs/LikeFilled";
import AvatarComment from "./AvatarComment";
import { Date } from "../Date";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import { Comment } from "@/app/__types__/types";
import likeComment from "@/app/api/posts/like_comment";
import deleteComment from "@/app/api/posts/delete_comment";
import { PostsContext } from "@/app/context/postsContext";
import getPosts from "@/app/api/posts/get_posts";

type CommContainerProps = {
  postID: string;
  comm: Comment;
};

const CommentContainer = ({ postID, comm }: CommContainerProps) => {
  const { comment, user, _id, createdAt } = comm;
  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isAuthor, setIsAuthor] = useState<boolean>();

  const handleLike = () => {
    likeComment(postID, _id, userContext.user?._id, handleSuccessLike);
    // handleError placeholder is just a console.log for now.
  };

  const openModal = () => {
    console.log("Open delete modal.", "And then on confirm:");
    handleDeleteComment();
  };

  const handleDeleteComment = () => {
    deleteComment(postID, _id, userContext.user?._id, handleSuccessDelete);
  };

  const handleSuccessLike = (data: { likes: string[] }) => {
    //Set the new like counter(maybe add "onHover: displayLikes()") and UI state.
    comm.likes = data.likes;
    setIsLiked(!isLiked);
  };

  const handleSuccessDelete = () => {
    console.log("On delete success, re-fetch the new comments:");
    getPosts(postsContext.setPosts);
  };
  useEffect(() => {
    // When a new comment gets rendered, establish the initial status.
    if (comment && userContext.user) {
      setIsLiked(comm.likes.includes(userContext.user!._id));
      setIsAuthor(userContext.user._id === user._id);
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
          <button
            onClick={handleLike}
            className="relative"
            aria-label="Like comment toggle icon"
            title={` ${comm.likes.length} ${
              comm.likes.length === 1 ? "like" : "likes"
            }
            `}
          >
            <p className="text-white2 text-xs absolute left-[90%] top-[-20%]">
              {comm.likes.length}
            </p>
            {isLiked ? <LikeFilled /> : <Like />}
          </button>
          <button
            onClick={openModal}
            aria-label="Delete this comment"
            title="Delete this comment"
          >
            {isAuthor && <DeleteSVG />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentContainer;
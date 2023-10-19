/* eslint-disable react-hooks/exhaustive-deps */
import Like from "@/app/utils/assets/svgs/Like";
import LikeFilled from "@/app/utils/assets/svgs/LikeFilled";
import AvatarComment from "../images/AvatarComment";
import { RelativeDate } from "../ui_elements/Date";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";

import likeComment from "@/app/utils/api/posts/like_comment";
import deleteComment from "@/app/utils/api/posts/delete_comment";
import { PostsContext } from "@/app/context/postsContext";
import getPosts from "@/app/utils/api/posts/get_posts";
import Close from "@/app/utils/assets/svgs/Close";
import DeleteModal from "../modals/DeleteModal";
import { Comment } from "@/app/utils/types";

type CommContainerProps = {
  postID: string;
  comm: Comment;
};

const CommentContainer = ({ postID, comm }: CommContainerProps) => {
  const { comment, user, _id, createdAt } = comm;
  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);

  const [likes, setLikes] = useState(comm.likes);
  // const [likenames, setLikenames] = useState<string[]>([] as string[]);
  // const [showNames, setShowNames] = useState(false);

  const [isLiked, setIsLiked] = useState<boolean>();
  const [isAuthor, setIsAuthor] = useState<boolean>();

  const handleLike = () => {
    console.log("like comment");
    likeComment(postID, _id, userContext.user?._id, handleSuccessLike);
    // handleError placeholder is just a console.log for now.
  };
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteComment(postID, _id, userContext.user?._id, handleSuccessDelete);
  };

  const handleSuccessLike = (data: { likes: string[] }) => {
    // Set the new like counter(maybe add "onHover: displayLikes()?") and UI state.
    setLikes(data.likes);
    setIsLiked(!isLiked);
  };

  const handleSuccessDelete = () => {
    // On delete success, reset the post context
    getPosts(postsContext.setPosts);
    setShowModal(false);
  };
  // const getLikeNames = () => {
  //   setLikenames([]);
  //   likes.forEach((userID) => getUsername(userID, setLikenames));
  // };

  // useEffect(() => {
  //   getLikeNames();
  // }, [likes]);

  useEffect(() => {
    // When a new comment gets rendered, establish the initial status.
    if (comm && userContext.user) {
      setIsLiked(likes.includes(userContext.user!._id));
      setIsAuthor(userContext.user._id === user._id);
      setLikes(comm.likes);
    }
  }, [userContext.user]);

  return (
    <div className="flex justify-between font-ubuntu">
      <div className="flex gap-1 items-center">
        <div className="flex flex-col">
          <div className="flex gap-1 items-center">
            <AvatarComment avatar={user.avatar} userID={user._id} />
            <a
              href={`/users/${user._id}`}
              className="text-secondary text-sm hover:text-accent font-ubuntu-500"
            >
              {user.first_name} {user.last_name}
            </a>
            <RelativeDate date={createdAt} />
          </div>
          <p className="text-white2 break-all ml-8"> {comment}</p>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-1 items-start">
        {isAuthor && (
          <button
            onClick={() => setShowModal(true)}
            aria-label="Delete this comment"
          >
            <Close />
          </button>
        )}
        {showModal && (
          <DeleteModal
            handleDelete={handleDelete}
            setShowModal={setShowModal}
          />
        )}
        <button
          onClick={handleLike}
          className="relative"
          aria-label="Like comment toggle icon"
          // onMouseEnter={() => setShowNames(true)}
          // onMouseLeave={() => setShowNames(false)}
        >
          <p className="text-white2 font-ubuntu-500 text-sm absolute left-[95%] top-[-20%]">
            {likes.length > 0 && likes.length}
          </p>
          {isLiked ? <LikeFilled /> : <Like />}
        </button>
      </div>
    </div>
  );
};

export default CommentContainer;

/* eslint-disable react-hooks/exhaustive-deps */
import deletePost from "@/app/api/posts/delete_post";
import getPosts from "@/app/api/posts/get_posts";
import { PostsContext } from "@/app/context/postsContext";
import { useContext, useEffect, useState } from "react";
import AvatarPost from "../images/AvatarPost";
import { User } from "@/app/__types__/types";
import { UserContext } from "@/app/context/userContext";
import Close from "@/app/assets/svgs/Close";
import { RelativeDate } from "../Date";
import { ModalContext } from "@/app/context/modalContext";
import DeletePostModal from "./DeletePostModal";

type AuthorProps = {
  postID: string;
  author: User;
  createdAt: string;
};

const Author = ({ postID, author, createdAt }: AuthorProps) => {
  const { avatar, _id, first_name, last_name } = author;

  const [isAuthor, setIsAuthor] = useState<boolean>();

  const postsContext = useContext(PostsContext);
  const userContext = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  //TODO MODAL
  const handleDelete = () => {
    deletePost(postID, handleSuccess);
  };
  const handleSuccess = () => {
    getPosts(postsContext.setPosts);
    setShowModal(false);
  };

  useEffect(() => {
    if (userContext.user) {
      setIsAuthor(author._id === userContext.user._id);
    }
  }, [userContext.user, postsContext.posts]);
  return (
    <div className="flex items-center justify-between px-4">
      {showModal && (
        <DeletePostModal
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      )}
      <div className="flex items-center gap-2">
        <AvatarPost avatar={avatar} userID={_id} />
        <div>
          <a
            href={`/users/${_id}`}
            className="font-ubuntu-500 text-white hover:text-yellow"
          >
            {first_name} {last_name}
          </a>
          <RelativeDate date={createdAt} />
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <button
          aria-label="Delete current post button"
          onClick={() => setShowModal(true)}
        >
          {isAuthor && <Close />}
        </button>
      </div>
    </div>
  );
};

export default Author;

/* eslint-disable react-hooks/exhaustive-deps */
import deletePost from "@/app/utils/api/posts/delete_post";
import getPosts from "@/app/utils/api/posts/get_posts";
import { PostsContext } from "@/app/context/postsContext";
import { useContext, useEffect, useState } from "react";
import AvatarPost from "../images/AvatarPost";
import { User } from "@/app/utils/__types__/types";
import { UserContext } from "@/app/context/userContext";
import Close from "@/app/utils/assets/svgs/Close";
import { RelativeDate } from "../ui_elements/Date";
import DeleteModal from "../modals/DeleteModal";
import getProfile from "@/app/utils/api/users/get_profile";

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

  const handleDelete = () => {
    deletePost(postID, handleSuccess);
  };

  const handleSuccess = () => {
    getPosts(postsContext.setPosts);
    setShowModal(false);
    //@ts-ignore
    getProfile(userContext.user?._id, userContext.setUser);
  };

  useEffect(() => {
    if (userContext.user) {
      setIsAuthor(author._id === userContext.user._id);
    }
  }, [userContext.user, postsContext.posts]);
  return (
    <div className="flex items-center justify-between px-4">
      {showModal && (
        <DeleteModal handleDelete={handleDelete} setShowModal={setShowModal} />
      )}
      <div className="flex items-center gap-2">
        <AvatarPost avatar={avatar} userID={_id} />
        <div>
          <a
            href={`/users/${_id}`}
            className="font-ubuntu-500 text-white hover:text-accent"
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

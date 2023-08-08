/* eslint-disable react-hooks/exhaustive-deps */
import deletePost from "@/app/api/posts/delete_post";
import getPosts from "@/app/api/posts/get_posts";
import { PostsContext } from "@/app/context/postsContext";
import { useContext, useEffect, useState } from "react";
import AvatarPost from "../images/AvatarPost";
import { ShortUser } from "@/app/__types__/types";
import { UserContext } from "@/app/context/userContext";
import Close from "@/app/assets/svgs/Close";
import { RelativeDate } from "../Date";

type AuthorProps = {
  postID: string;
  author: ShortUser;
  createdAt: string;
};

const Author = ({ postID, author, createdAt }: AuthorProps) => {
  const { avatar, _id, first_name, last_name } = author;

  const [isAuthor, setIsAuthor] = useState<boolean>();

  const postsContext = useContext(PostsContext);
  const userContext = useContext(UserContext);
  //TODO MODAL
  const openModal = () => {
    console.log("open delete modal");
    deletePost(postID, handleSuccess);
  };
  const handleSuccess = () => {
    getPosts(postsContext.setPosts);
  };

  useEffect(() => {
    if (userContext.user) {
      setIsAuthor(author._id === userContext.user._id);
    }
  }, [userContext.user, postsContext.posts]);
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <AvatarPost avatar={avatar} userID={_id} />
        <a
          href={`/users/${_id}`}
          className="font-ubuntu-500 text-white hover:text-yellow"
        >
          {first_name} {last_name}
        </a>
      </div>
      <div className="flex gap-1 items-center">
        <RelativeDate date={createdAt} />
        <button
          aria-label="Delete current post button"
          onClick={openModal}
          title="Delete"
        >
          {isAuthor && <Close />}
        </button>
      </div>
    </div>
  );
};

export default Author;

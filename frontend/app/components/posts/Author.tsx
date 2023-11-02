/* eslint-disable react-hooks/exhaustive-deps */
import { PostsContext } from "@/app/context/postsContext";
import { SetStateAction, useContext, useEffect, useState } from "react";
import AvatarPost from "../images/AvatarPost";
import { UserContext } from "@/app/context/userContext";
import Close from "@/app/utils/assets/svgs/Close";
import { RelativeDate } from "../ui_elements/Date";
import { User } from "@/app/utils/types";

type AuthorProps = {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  author: User;
  createdAt: string;
};

const Author = ({ setShowModal, author, createdAt }: AuthorProps) => {
  const { avatar, _id, first_name, last_name } = author;
  const [isAuthor, setIsAuthor] = useState<boolean>();
  
  const postsContext = useContext(PostsContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.user) {
      setIsAuthor(author._id === userContext.user._id);
    }
  }, [userContext.user, postsContext.posts]);
  return (
    <div aria-label="author-section" className="flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <AvatarPost avatar={avatar} userID={_id} isAuthor={isAuthor}/>
        <div>
          <a
            href={`/users/${_id}`}
            className="font-ubuntu-500 text-xl text-secondary hover:text-accent"
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

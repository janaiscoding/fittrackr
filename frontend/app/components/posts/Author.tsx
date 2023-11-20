/* eslint-disable react-hooks/exhaustive-deps */
import { PostsContext } from "@/app/context/postsContext";
import { SetStateAction, useContext, useEffect, useState } from "react";
import AvatarPost from "../images/AvatarPost";
import { UserContext } from "@/app/context/userContext";
import Close from "@/app/utils/assets/svgs/Close";
import { RelativeDate } from "../ui_elements/Date";
import { ImageType, User } from "@/app/utils/types";
import Edit from "@/app/utils/assets/svgs/Edit";

type AuthorProps = {
  setShowDelModal: React.Dispatch<SetStateAction<boolean>>;
  author: User;
  createdAt: string;
  isAuthor: boolean | undefined;
  setShowEditModal: React.Dispatch<SetStateAction<boolean>>;
};

const Author = ({
  setShowDelModal,
  author,
  isAuthor,
  createdAt,
  setShowEditModal,
}: AuthorProps) => {
  const { _id, first_name, last_name } = author;

  return (
    <div
      aria-label="author-section"
      className="flex items-center justify-between px-4"
    >
      <div className="flex items-center gap-2">
        <AvatarPost avatar={author.avatar} userID={_id} isAuthor={isAuthor} />
        <div>
          <a
            href={`/users/${_id}`}
            className="font-ubuntu-500 text-xl hover:text-accent"
          >
            {first_name} {last_name}
          </a>
          <RelativeDate date={createdAt} />
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <button
          aria-label="Edit current post description button"
          onClick={() => setShowEditModal(true)}
        >
          {isAuthor && <Edit />}
        </button>
        <button
          aria-label="Delete current post button"
          onClick={() => setShowDelModal(true)}
        >
          {isAuthor && <Close />}
        </button>
      </div>
    </div>
  );
};

export default Author;

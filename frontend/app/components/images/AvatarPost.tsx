import { ImageType } from "@/app/utils/types";
import { CldImage } from "next-cloudinary";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";

type AvatarProps = {
  avatar: ImageType;
  userID: string;
  isAuthor: boolean | undefined;
};

//Avatar on post info
const AvatarPost = ({ avatar, userID, isAuthor }: AvatarProps) => {
  return (
    <a href={`/users/${userID}`}>
      <CldImage
        src={avatar.url}
        width={400}
        height={400}
        className="w-12 h-12 rounded-full object-cover post-pic"
        alt={avatar.alt}
      />
    </a>
  );
};

export default AvatarPost;

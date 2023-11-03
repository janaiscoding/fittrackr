import { ImageType } from "@/app/utils/types";
import Image from "next/image";
import defaultPic from "../../../public/assets/default_avatar.jpg";
import { CldImage } from "next-cloudinary";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";

type AvatarProps = {
  avatar: ImageType;
  userID: string;
  isAuthor: boolean | undefined;
};

const AvatarPost = ({ avatar, userID, isAuthor }: AvatarProps) => {
  const [authorAvatar, setAuthorAvatar] = useState(avatar);
  const userContext = useContext(UserContext);

  // In the case that I am on my user profile and I change my avatar, I want all posts on my feed to also update the avatar.
  useEffect(() => {
    if (isAuthor && userContext.user) {
      setAuthorAvatar(userContext.user.avatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user, isAuthor]);
  return (
    <a href={`/users/${userID}`}>
      {avatar !== undefined ? (
        <CldImage
          src={authorAvatar.url}
          width={200}
          height={200}
          className="w-12 h-12 rounded-full object-cover"
          alt={authorAvatar.alt}
        />
      ) : (
        <Image
          src={defaultPic}
          className="w-12 h-12 rounded-full object-cover"
          alt="user-default-profile-picture"
        />
      )}
    </a>
  );
};

export default AvatarPost;

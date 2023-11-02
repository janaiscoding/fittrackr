import { ImageType } from "@/app/utils/types";
import Image from "next/image";
import defaultPic from "../../../public/assets/default_avatar.jpg";
import { CldImage } from "next-cloudinary";
const AvatarComment = ({
  avatar,
  userID,
}: {
  avatar: ImageType;
  userID: string;
}) => {
  return (
    <a href={`/users/${userID}`}>
      {avatar !== undefined ? (
        <CldImage
          src={avatar.url}
          width={200}
          height={200}
          className="rounded-full object-cover border-2 border-solid border-outline comment-image"
          alt={avatar.alt}
        />
      ) : (
        <Image
          src={defaultPic}
          className="rounded-full object-cover comment-image"
          alt="user-default-profile-picture"
        />
      )}
    </a>
  );
};

export default AvatarComment;

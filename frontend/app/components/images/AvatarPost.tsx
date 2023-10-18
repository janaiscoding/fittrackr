import { Avatar } from "@/app/utils/types";
import Image from "next/image";
import defaultPic from "../../../public/assets/default_avatar.jpg";
type AvatarProps = {
  avatar: Avatar;
  userID: string;
};
const AvatarPost = ({ avatar, userID }: AvatarProps) => {
  return (
    <a href={`/users/${userID}`}>
      {avatar !== undefined ? (
        <Image
          src={`data:${avatar.contentType};base64,${Buffer.from(
            avatar.data
          ).toString("base64")}`}
          width={40}
          height={0}
          className="w-12 h-12 rounded-full object-cover post-avatar-image"
          alt="user-profile-picture"
        />
      ) : (
        <Image
          src={defaultPic}
          className="w-12 h-12 rounded-full object-cover post-avatar-image"
          alt="user-default-profile-picture"
        />
      )}
    </a>
  );
};

export default AvatarPost;

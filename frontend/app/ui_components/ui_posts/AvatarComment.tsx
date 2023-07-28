import { Avatar } from "@/app/__types__/types";
import Image from "next/image";
import defaultPic from "../../../public/assets/default_avatar.jpg";
const AvatarComment = ({
  avatar,
  userID,
}: {
  avatar: Avatar;
  userID: string;
}) => {
  return (
    <a href={`/users/${userID}`}>
      {avatar !== undefined ? (
        <Image
          src={`data:${avatar.contentType};base64,${Buffer.from(
            avatar.data
          ).toString("base64")}`}
          width={40}
          height={0}
          className="w-10 h-10 rounded-full object-cover border-2 border-solid border-mid-green"
          alt="user-profile-picture"
        />
      ) : (
        <Image
          src={defaultPic}
          className="w-10 h-10 rounded-full object-cover border-2 border-solid border-mid-green"
          alt="user-default-profile-picture"
        />
      )}
    </a>
  );
};

export default AvatarComment;

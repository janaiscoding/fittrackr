import { Avatar } from "@/app/__types__/types";
import Image from "next/image";
import defaultPic from "../../../public/assets/default_avatar.jpg";
type AvatarProps = {
  avatar: Avatar;
  userID: string;
};
const AvatarCommunity = ({ avatar, userID }: AvatarProps) => {
  return (
    <a href={`/users/${userID}`}>
      {avatar !== undefined ? (
        <Image
          src={`data:${avatar.contentType};base64,${Buffer.from(
            avatar.data
          ).toString("base64")}`}
          width={40}
          height={0}
          className="w-24 h-24 rounded-full object-cover"
          alt="user-profile-picture"
        />
      ) : (
        // <Image
        //   src={defaultPic}
        //   className="w-24 h-24 rounded-full object-cover"
        //   alt="user-default-profile-picture"
        // />
        <div className="rounded-full object-cover border-2 border-solid border-yellow2 comment-image text-center bg-blue">
        ?
      </div>
      )}
    </a>
  );
};

export default AvatarCommunity;

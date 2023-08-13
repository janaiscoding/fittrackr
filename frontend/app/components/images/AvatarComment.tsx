import { Avatar } from "@/app/utils/__types__/types";
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
          className="rounded-full object-cover border-2 border-solid border-outline comment-image"
          alt="user-profile-picture"
        />
      ) : (
        // <Image
        //   src={defaultPic}
        //   className="rounded-full object-cover border-2 border-solid border-secondary comment-image"
        //   alt="user-default-profile-picture"
        // />
        <div className="rounded-full object-cover border-2 border-solid border-outline comment-image text-center bg-bgContainers">
          ?
        </div>
      )}
    </a>
  );
};

export default AvatarComment;

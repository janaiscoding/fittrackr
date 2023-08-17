import Image from "next/image";
import { Avatar } from "@/app/utils/types";

const AvatarProfile = ({
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
          className="w-12 h-12 rounded-full object-cover profile-image"
          alt="user-profile-picture"
        />
      ) : (
        // <Image
        //   src={defaultPic}
        //   className="w-12 h-12 rounded-full object-cover post-avatar-image"
        //   alt="user-default-profile-picture"
        // />
        <div className="rounded-full object-cover border-2 border-solid border-outline comment-image text-center bg-bgContainers">
          ?
        </div>
      )}
    </a>
  );
};

export default AvatarProfile;

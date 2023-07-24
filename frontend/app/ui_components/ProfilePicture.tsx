import Image from "next/image";
import { Avatar } from "../__types__/types";

const ProfilePicture = ({
  avatar,
  name,
  userID,
}: {
  avatar: Avatar;
  name: string;
  userID: string;
}) => {
  return (
    <a href={`/users/${userID}`}>
      {avatar !== undefined ? (
        <Image
          src={`data:${avatar.contentType};base64,${Buffer.from(
            avatar.data
          ).toString("base64")}`}
          width={50}
          height={0}
          className="h-auto"
          alt="user-profile-picture"
        />
      ) : (
        name !== undefined && (
          <p className="bg-green name-circle uppercase font-ubuntu-300">
            {name.charAt(0)}
          </p>
        )
      )}
    </a>
  );
};

export default ProfilePicture;

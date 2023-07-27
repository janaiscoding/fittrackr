import Image from "next/image";
import { Avatar } from "../__types__/types";

const ProfilePicture = ({ avatar }: { avatar: Avatar }) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`data:${avatar.contentType};base64,${Buffer.from(
        avatar.data
      ).toString("base64")}`}
      className="w-20 h-20 rounded-full object-cover border-2 border-solid border-mid-green"
      alt="user-profile-picture"
    />
  );
};

export default ProfilePicture;

import Image from "next/image";
import { Avatar } from "../../__types__/types";
import defaultPic from "../../../public/assets/default_avatar.jpg";

const CommunityPicture = ({
  avatar,
  userID,
}: {
  avatar: Avatar;
  userID: string;
}) => {
  return (
    <a href={`/users/${userID}`}>
      {avatar?.data !== undefined ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`data:${avatar.contentType};base64,${Buffer.from(
            avatar.data
          ).toString("base64")}`}
          className="w-16 h-16 rounded-full object-cover border-2 border-solid border-mid-green"
          alt="user-profile-picture"
        />
      ) : (
        <Image
          src={defaultPic}
          className="w-16 h-16 rounded-full object-cover border-2 border-solid border-mid-green"
          alt="user-default-profile-picture"
        />
      )}
    </a>
  );
};

export default CommunityPicture;

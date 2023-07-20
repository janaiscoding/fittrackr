import Image from "next/image";
import { User } from "../utils/types/types";

const ProfilePicture = ({ userData }: {userData: User}) => {
  //fix user type
  return (
    <a className="flex" href={`/users/${userData._id}`}>
      {userData.avatar !== undefined ? (
        <Image
          src={`data:${userData.avatar?.contentType};base64,${Buffer.from(
            userData.avatar?.data
          ).toString("base64")}`}
          width={50}
          height={0}
          className="h-auto"
          alt="user-profile-picture"
        />
      ) : (
        <p className="bg-[#abc] p-10 rounded-full">
          {userData.first_name?.charAt(0)}
        </p>
      )}
    </a>
  );
};

export default ProfilePicture;

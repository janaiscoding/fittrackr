import Image from "next/image";

const ProfilePicture = ({ userData }: any) => {
  //fix user type
  return (
    <div className="flex">
      {userData.avatar !== undefined ? (
        <Image
          src={`data:${userData.avatar.contentType};base64,${Buffer.from(
            userData.avatar.data
          ).toString("base64")}`}
          width={50}
          height={0}
          className="h-auto"
          alt="user-profile-picture"
        />
      ) : (
        <p className="bg-[#abc] p-10 rounded-full">
          {userData.first_name.charAt(0)}
        </p>
      )}
    </div>
  );
};

export default ProfilePicture;

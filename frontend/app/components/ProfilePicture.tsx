import Image from "next/image";

const ProfilePicture = ({ userData }: any) => {
  return (
    <>
      {userData.avatar !== undefined && userData.avatar.data && (
        <div>
          <Image
            src={`data:${userData.avatar.contentType};base64,${Buffer.from(
              userData.avatar.data
            ).toString("base64")}`}
            width={50}
            height={0}
            className="h-auto"
            alt="user-profile-picture"
          />
        </div>
      )}
    </>
  );
};
export default ProfilePicture;

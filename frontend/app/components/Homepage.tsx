"use client";
import Image from "next/image";

const Homepage = ({ userData }: any) => {
  return (
    <>
      <p>Welcome back, {userData.first_name}</p>
      {userData.avatar && (
        <div>
          <Image
            src={`data:${userData.avatar.contentType};base64,${Buffer.from(
              userData.avatar.data
            ).toString("base64")}`}
            width={50}
            height={50}
            alt="user-profile-picture"
          />
        </div>
      )}
    </>
  );
};

export default Homepage;

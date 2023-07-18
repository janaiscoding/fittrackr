"use client";
import Image from "next/image";
import { removeJwtToken } from "../utils/auth_handler";
import { redirect } from "next/navigation";

const Homepage = ({ userData }: any) => {
  const handleSignout = () => {
    removeJwtToken(); 
    redirect("/login");
  };
  return (
    <div>
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
      <button className="btn" onClick={handleSignout}>
        Sign out
      </button>
    </div>
  );
};

export default Homepage;

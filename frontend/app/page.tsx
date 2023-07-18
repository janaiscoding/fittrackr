"use client";

import { useEffect, useState } from "react";
import { getJwtToken } from "./utils/auth_handler";
import Image from "next/image";
import verifyToken from "./utils/api/verifyToken";

export default function Home() {
  const [userData, setUserData] = useState<any>([]); //logged in user

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, setUserData);
    }
    console.log("hey");
  }, []);
  return (
    <main>
      <div>
        <p>Welcome back, {userData.first_name}</p>
        {userData.avatar && (
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
        {/* <button className="btn" onClick={handleSignout}>
        Sign out
      </button> */}
      </div>
    </main>
  );
}

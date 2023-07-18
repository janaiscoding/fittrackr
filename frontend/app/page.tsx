"use client";

import { useEffect, useState } from "react";
import { getJwtToken, removeJwtToken } from "./utils/auth_handler";
import verifyToken from "./utils/api/verifyToken";
import Signout from "./components/Signout";
import ProfilePicture from "./components/ProfilePicture";

export default function Home() {
  const [userData, setUserData] = useState<any>([]); //logged in user - need to fix type

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, setUserData);
    }
  }, []);
  return (
    <main>
      <div>
        <p>Welcome back, {userData.first_name}</p>
        <ProfilePicture userData={userData} />
        <Signout />
      </div>
    </main>
  );
}

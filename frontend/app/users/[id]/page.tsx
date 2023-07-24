"use client";

import fetchUser from "@/app/api/fetchers/fullUser";
import { useEffect, useState } from "react";
import { Post, User } from "@/app/__types__/types";

import { getJwtToken } from "@/app/api/auth_handler";


const ProfilePage = ({ params: { id } }: { params: { id: string } }) => {
  const [profileData, setProfileData] = useState< User | null>(null);

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      fetchUser(token, id, setProfileData);
    }
  }, [id]);

  return (
    <div>
      <p> {profileData?.first_name}`s profile page</p>
      <p> POSTS </p>
      <p> FRIENDS </p>
      {/* {profileData?.friends.map((f, i)=> <p key={i}>{f.first_name}</p>)} */}
    </div>
  );
};

export default ProfilePage;

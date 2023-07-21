"use client";
import { getJwtToken } from "@/app/utils/auth_handler";
import fetchUser from "@/app/utils/fetchers/fullUser";
import { useEffect, useState } from "react";
import { Post, User } from "@/app/utils/types/types";
import PostComponent from "@/app/components/post_components/PostComponent";



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

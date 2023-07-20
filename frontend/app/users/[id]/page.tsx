"use client";
import { getJwtToken } from "@/app/utils/auth_handler";
import fetchUser from "@/app/utils/fetchers/fullUser";
import { useEffect, useState } from "react";
import { FullUser, Post } from "@/app/utils/types/types";
import PostComponent from "@/app/posts_components/Post";

const ProfilePage = ({ params: { id } }: { params: { id: string } }) => {
  const [profileData, setProfileData] = useState<FullUser | null>(null);

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
      {profileData?.posts.map((post)=> (<PostComponent key={post._id} post={post}/>))}
      <p> FRIENDS </p>
      {profileData?.friends.map((f, i)=> <p key={i}>{f.first_name}</p>)}
    </div>
  );
};

export default ProfilePage;

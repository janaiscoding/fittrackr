"use client";

import { useEffect, useState } from "react";
import { getJwtToken } from "./utils/auth_handler";
import Signout from "./components/Signout";
import ProfilePicture from "./components/ProfilePicture";
import fetchPosts from "./utils/fetchers/posts";
import PostComponent from "./posts_components/Post";
import fetchUsers from "./utils/fetchers/users";
import { Post, User } from "./utils/types/types";
import verifyToken from "./utils/api/verifyToken";
import Logo from "./components/Logo";

export default function Home() {
  const [userData, setUserData] = useState<User | null>(null);
  const [postsData, setPostsData] = useState<Post[] | null>(null);
  const [usersData, setUsersData] = useState<User[] | null>(null);

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, setUserData);
      fetchPosts(token, setPostsData);
      fetchUsers(token, setUsersData);
    }
  }, []);
  return (
    <div className="home-image min-h-screen flex flex-col items-center">
      <Logo />
      {userData ? (
        <ProfilePicture userData={userData} />
      ) : (
        <p>fallback component</p>
      )}

      {usersData ? (
        <div>
          <p>USER LIST</p>
          {usersData?.map((user: User, i: number) => (
            <a href={`/users/${user._id}`} key={i}>
              {i + 1}. {user.first_name}
            </a>
          ))}
        </div>
      ) : (
        <p>fallback component for users</p>
      )}

      <Signout setUserData={setUserData} />
      {postsData?.map(
        (
          p: any,
          i: number //fix here
        ) => (
          <PostComponent key={i} post={p} />
        )
      )}
    </div>
  );
}

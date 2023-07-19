"use client";

import { Suspense, useEffect, useState } from "react";
import { getJwtToken } from "./utils/auth_handler";
import verifyToken from "./utils/api/verifyToken";
import Signout from "./components/Signout";
import ProfilePicture from "./components/ProfilePicture";
import fetchPosts from "./utils/fetchers/posts";
import Post from "./posts_components/Post";
import fetchUsers from "./utils/fetchers/users";

export default function Home() {
  const [userData, setUserData] = useState<any>([]); //logged in user - need to fix type
  const [postsData, setPostsData] = useState<any>([]);
  const [usersData, setUsersData] = useState<any>([]);
  // to do
  // friend requests
  // all users
  // buttons

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, setUserData);
      fetchPosts(token, setPostsData);
      fetchUsers(token, setUsersData);
    }
  }, []);
  return (
    <div>
      {userData.length === 0 ? (
        <p>fallback component</p>
      ) : (
        <ProfilePicture userData={userData} />
      )}

      {usersData.length === 0 ? (
        <p>fallback component for users</p>
      ) : (
        <div>
          <p>USER LIST</p>
          {usersData.map((user, i) => (
            <a href={`/users/${user._id}`} key={i}>
              {i + 1}. {user.first_name}
            </a>
          ))}
        </div>
      )}

      <Signout />
      {postsData.map((p, i) => (
        <Post key={i} post={p} />
      ))}
    </div>
  );
}

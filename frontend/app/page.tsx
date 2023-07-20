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
import IntroCard from "./components/intro_card/IntroCard";

export default function Home() {
  const [userData, setUserData] = useState<User | null>(null);
  const [postsData, setPostsData] = useState<Post[] | null>(null);
  const [usersData, setUsersData] = useState<User[] | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      setIsLogged(true);
      verifyToken(token, setUserData);
      fetchPosts(token, setPostsData);
      fetchUsers(token, setUsersData);
    }
    console.log(isLogged);
  }, []);
  return (
    <div className="min-h-screen">
      {isLogged ? (
        <p className="text-white">im logged</p>
      ) : (
        <div className="flex flex-col min-h-screen home-image items-center justify-between">
          <Logo />
          <IntroCard />
        </div>
      )}

      {/* {userData ? (
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
      )} */}
    </div>
  );
}

"use client";

import { useEffect, useState, createContext } from "react";
import { getJwtToken } from "./utils/auth_handler";
import fetchPosts from "./utils/fetchers/posts";
import fetchUsers from "./utils/fetchers/users";
import { Post, User } from "./utils/types/types";
import verifyToken from "./utils/api/verifyToken";
import Logo from "./components/svgs/Logo";
import IntroCard from "./components/intro_card/IntroCard";
import Homepage from "./homepage/Homepage";
import TopNav from "./homepage/TopNav";

export const UserContext = createContext<any>({
  userID: "",
  name: "",
  avatar: {},
  requestsReceived: [],
  requestsSent: [],
  posts: [],
});

export default function Home() {
  const [userData, setUserData] = useState<User | null>(null);
  const [postsData, setPostsData] = useState<Post[]>([] as Post[]);
  // const [usersData, setUsersData] = useState<User[] | null>(null); //get all users
  const [isLogged, setIsLogged] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      setIsLogged(true);
      setLoading(false);
      fetchPosts(token, setPostsData);
      verifyToken(token, setUserData);
    } else {
      setLoading(false);
      setIsLogged(false);
    }
  }, []);
  return (
    <div className="min-h-screen">
      {loading ? (
        <p>loading animation</p>
      ) : isLogged ? (
        <UserContext.Provider
          value={{
            userID: userData?._id,
            name: userData?.first_name,
            avatar: userData?.avatar,
            requestsReceived: userData?.requestsReceived,
            requestsSent: userData?.requestsSent,
            posts: postsData,
          }}
        >
          <TopNav />
          <Homepage />
        </UserContext.Provider>
      ) : (
        <div className="flex flex-col min-h-screen home-image items-center justify-between pt-4">
          <Logo />
          <IntroCard />
        </div>
      )}
    </div>
  );
}

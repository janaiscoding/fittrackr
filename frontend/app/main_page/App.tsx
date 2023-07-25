"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { getJwtToken, removeJwtToken } from "../api/auth_handler";
import { useRouter } from "next/navigation";
import { Post, User } from "../__types__/types";
import { verifyAPI } from "../api/endpoints";
import TopNav from "../ui_components/top_navbar/TopNav";
import fetchPosts from "../api/fetchers/posts";
import BotNav from "../ui_components/bottom_navbar/BotNav";
import Posts from "./Posts";
import FormPost from "./FormPost";

const App = ({ isShown }: { isShown: boolean }) => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const verifyToken = async (
    token: string,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
  ) => {
    await fetch(verifyAPI, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          //Rejected/Invalid Token!! Remove Token | Clear User | Redirect to login
          removeJwtToken();
          setUser(null);
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, userContext.setUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-6">
      Welcome back from main_page app:
      {userContext.user?.first_name} {userContext.user?.last_name}
      <Posts />
      {isShown && <FormPost />}
    </div>
  );
};

export default App;

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import TopNav from "../components/top_navbar/TopNav";
import BotNav from "../components/bottom_navbar/BotNav";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import UsersComponent from "../components/users/Users";
import { getJwtToken } from "../api/auth/auth_handler";
import verifyToken from "../api/auth/verify_token";
import { useRouter } from "next/navigation";

const UserPage = () => {
  const [isShown, setShown] = useState(false);

  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const token = getJwtToken();
    token && verifyToken(token, userContext.setUser, router);
    
  }, []);

  return (
    <div>
      <TopNav />
      <UsersComponent isShown={isShown} setShown={setShown} />
      <BotNav isShown={isShown} setShown={setShown} />
    </div>
  );
};

export default UserPage;

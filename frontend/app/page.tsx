/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import BotNav from "./components/bottom_navbar/BotNav";
import TopNav from "./components/top_navbar/TopNav";
import Home from "./main_page/Home";
import { getJwtToken } from "./api/auth/auth_handler";
import verifyToken from "./api/auth/verify_token";
import { useRouter } from "next/navigation";

export default function App() {
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
      <Home isShown={isShown} setShown={setShown} />
      <BotNav isShown={isShown} setShown={setShown} />
    </div>
  );
}

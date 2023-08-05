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
import FormPost from "./components/forms/FormPost";
import { PostsContextProvider } from "./context/postsContext";
import { ModalContext } from "./context/modalContext";

export default function App() {
  const [isShown, setShown] = useState(false);

  const router = useRouter();
  const userContext = useContext(UserContext);
  const modalContext = useContext(ModalContext)

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, userContext.setUser, router);
    }
  }, []);

  return (
      <div className="bg-black">
        <TopNav />
        <Home />
        {modalContext.modal && <FormPost  />}
        <BotNav />
      </div>
  );
}

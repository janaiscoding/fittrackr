/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import TopNav from "@/app/components/top_navbar/TopNav";

import BotNav from "@/app/components/bottom_navbar/BotNav";
import { UserContext } from "@/app/context/userContext";
import { useContext, useEffect, useState } from "react";
import UserPage from "../../components/user/UserPage";
import FormPost from "@/app/components/forms/FormModal";
import verifyToken from "@/app/api/auth/verify_token";
import { getJwtToken } from "@/app/api/auth/auth_handler";
import { useRouter } from "next/navigation";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [isShown, setShown] = useState(false);

  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const token = getJwtToken();
    token && verifyToken(token, userContext.setUser, router);
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <TopNav />
        <UserPage id={id} isShown={isShown} />
      </div>
      {/* {isShown && <FormPost setShown={setShown} />}
      <BotNav isShown={isShown} setShown={setShown} /> */}
    </div>
  );
};

export default Page;

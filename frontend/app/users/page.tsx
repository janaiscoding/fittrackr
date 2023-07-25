"use client";
import TopNav from "../ui_components/top_navbar/TopNav";
import BotNav from "../ui_components/bottom_navbar/BotNav";

import { useContext, useEffect, useState } from "react";
import { getJwtToken, removeJwtToken } from "../api/auth_handler";
import { UserContext, UserContextProvider } from "../context/userContext";
import { useRouter } from "next/navigation";
import { User } from "../__types__/types";
import { verifyAPI } from "../api/endpoints";
import UsersComponent from "./Users";
import FormPost from "../main_page/FormPost";

const UserPage = () => {
  const [isShown, setShown] = useState(false);

  return (
    <UserContextProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <TopNav />
          <UsersComponent />
          {isShown && <FormPost />}
        </div>
        <BotNav isShown={isShown} setShown={setShown} />
      </div>
    </UserContextProvider>
  );
};

export default UserPage;

"use client";
import TopNav from "../ui_components/top_navbar/TopNav";
import BotNav from "../ui_components/bottom_navbar/BotNav";

import { useState } from "react";
import { UserContextProvider } from "../context/userContext";

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
        </div>
        {isShown && <FormPost setShown={setShown} />}
        <BotNav isShown={isShown} setShown={setShown} />
      </div>
    </UserContextProvider>
  );
};

export default UserPage;

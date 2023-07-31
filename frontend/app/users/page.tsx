"use client";
import TopNav from "../components/top_navbar/TopNav";
import BotNav from "../components/bottom_navbar/BotNav";
import { useState } from "react";
import { UserContextProvider } from "../context/userContext";
import UsersComponent from "../components/users/Users";

const UserPage = () => {
  const [isShown, setShown] = useState(false);

  return (
    <UserContextProvider>
      <TopNav />
      <UsersComponent isShown={isShown} setShown={setShown}/>
      <BotNav isShown={isShown} setShown={setShown} />
    </UserContextProvider>
  );
};

export default UserPage;

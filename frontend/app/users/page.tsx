/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import TopNav from "../components/top_navbar/TopNav";
import BotNav from "../components/bottom_navbar/BotNav";
import useTokenVerification from "../hooks/useTokenVerification";

const UserPage = () => {
  useTokenVerification();
  return (
    <div>
      <TopNav />
      {/* <UsersComponent /> */}
      <BotNav />
    </div>
  );
};

export default UserPage;

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useTokenVerification from "../hooks/useTokenVerification";
import Social from "../components/homepage_layout/right_column/Social";
import Sidebar from "../components/homepage_layout/left_column/Sidebar";
import CommunityLayout from "../components/community_layout/CommunityLayout";
import TopNav from "../components/navigation/TopNav";
import BotNav from "../components/navigation/BotNav";

const Users = () => {
  useTokenVerification();

  return (
    <div className="m-auto">
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex justify-between items-start gap-2 p-2">
        <Sidebar />
        <CommunityLayout />
        <Social />
      </div>
      <BotNav />
    </div>
  );
};

export default Users;

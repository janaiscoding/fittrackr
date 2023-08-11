/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BotNav from "./components/bottom_navbar/BotNav";
import Sidebar from "./components/homepage_layout/left_column/Sidebar";
import AppData from "./components/homepage_layout/middle_column/AppData";
import Social from "./components/homepage_layout/right_column/Social";
import TopNav from "./components/top_navbar/TopNav";
import useTokenVerification from "./hooks/useTokenVerification";

const Home = () => {
  useTokenVerification();

  return (
    <div className="bg-black">
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex justify-between items-start gap-2 p-2">
        <Sidebar />
        <AppData />
        <Social />
      </div>
      <BotNav />
    </div>
  );
};

export default Home;

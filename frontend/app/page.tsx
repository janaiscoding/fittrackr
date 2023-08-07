/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BotNav from "./components/bottom_navbar/BotNav";
import TopNav from "./components/top_navbar/TopNav";
import useTokenVerification from "./hooks/useTokenVerification";
import AppData from "./main_page/AppData";
import Sidebar from "./main_page/Sidebar";

const Home = () => {
  useTokenVerification();
  return (
    <div className="bg-black">
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex justify-between items-start gap-2 py-4">
        <Sidebar />
        <AppData />
        <Sidebar />
      </div>
      <BotNav />
    </div>
  );
};

export default Home;

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BotNav from "./components/bottom_navbar/BotNav";
import TopNav from "./components/top_navbar/TopNav";
import useTokenVerification from "./hooks/useTokenVerification";
import AppData from "./main_page/AppData";
import Sidebar from "./main_page/Sidebar";
import Social from "./main_page/Social";
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

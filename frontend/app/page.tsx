/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BotNav from "./components/bottom_navbar/BotNav";
import TopNav from "./components/top_navbar/TopNav";
import useTokenVerification from "./hooks/useTokenVerification";
import PostsContainer from "./main_page/PostsContainer";
import LeftContainer from "./main_page/LeftContainer";
import RightContainer from "./main_page/RightContainer";

const Home = () => {
  useTokenVerification();
  return (
    <div className="bg-black">
      <TopNav />
      <div className="max-w-5xl m-auto min-h-[90vh] flex justify-between items-start gap-2 py-4">
        <LeftContainer />
        <PostsContainer />
        <LeftContainer />
      </div>
      <BotNav />
    </div>
  );
};

export default Home;

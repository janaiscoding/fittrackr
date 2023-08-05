/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext } from "react";
import BotNav from "./components/bottom_navbar/BotNav";
import TopNav from "./components/top_navbar/TopNav";
import { ModalContext } from "./context/modalContext";
import FormModal from "./components/forms/FormModal";
import useTokenVerification from "./hooks/useTokenVerification";
import PostsContainer from "./main_page/PostsContainer";
import LeftContainer from "./main_page/LeftContainer";
import RightContainer from "./main_page/RightContainer";

const Home = () => {
  useTokenVerification();
  // Handles mobile create a new post form modal.
  const modalContext = useContext(ModalContext);

  return (
    <div className="bg-black">
      <TopNav />
      <div className="min-h-[90vh] flex md:justify-evenly justify-center items-start gap-2 py-4">
        {modalContext.modal && <FormModal />}
        <LeftContainer />
        <PostsContainer />
        <RightContainer />
      </div>
      <BotNav />
    </div>
  );
};

export default Home;

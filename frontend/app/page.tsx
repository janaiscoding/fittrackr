/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect, useState } from "react";
import TopNav from "./components/navigation/TopNav";
import Sidebar from "./components/homepage_layout/left_column/Sidebar";
import AppData from "./components/homepage_layout/middle_column/AppData";
import Social from "./components/homepage_layout/right_column/Social";
import FormModal from "./components/modals/FormModal";
import useTokenVerification from "./hooks/useTokenVerification";
import { ModalContext } from "./context/modalContext";
import BotNav from "./components/navigation/BotNav";
import Footer from "./components/ui_elements/Footer";
import DeleteModal from "./components/modals/DeleteModal";

const Home = () => {
  useTokenVerification();
  const modalContext = useContext(ModalContext);

  return (
    <div>
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex justify-between items-start gap-2 p-2">
        <Sidebar />
        <AppData />
        <Social />
        {modalContext.modalPost && <FormModal />}
      </div>
      <BotNav />
    </div>
  );
};

export default Home;

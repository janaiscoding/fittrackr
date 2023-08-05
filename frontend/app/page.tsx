/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext } from "react";
import BotNav from "./components/bottom_navbar/BotNav";
import TopNav from "./components/top_navbar/TopNav";
import Home from "./main_page/Home";
import { ModalContext } from "./context/modalContext";
import FormModal from "./components/forms/FormModal";
import useTokenVerification from "./hooks/useTokenVerification";

export default function App() {
  // This custom hook only needs to be called
  // It will handle the logic for a valid token: sets user context
  // And invalid: cleans token and user and logs you out.
  useTokenVerification();
  // Handles mobile create a new post form modal.
  const modalContext = useContext(ModalContext);
  return (
    <div className="bg-black">
      <TopNav />
      <Home />
      {modalContext.modal && <FormModal />}
      <BotNav />
    </div>
  );
}

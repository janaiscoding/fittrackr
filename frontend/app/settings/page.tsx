'use client'
import { useContext } from "react";
import useTokenVerification from "../hooks/useTokenVerification";
import { ModalContext } from "../context/modalContext";
import TopNav from "../components/navigation/TopNav";
import BotNav from "../components/navigation/BotNav";
import FormModal from "../components/modals/FormModal";

const Settings = () => {
  useTokenVerification();
  const modalContext = useContext(ModalContext);

  return (
    <div className="bg-black">
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex justify-between items-start gap-2 p-2">
        settings page
        {modalContext.modalPost && <FormModal />}
      </div>
      <BotNav />
    </div>
  );
};
export default Settings;
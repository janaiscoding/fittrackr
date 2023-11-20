/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext } from "react";
import TopNav from "./components/navigation/TopNav";
import Sidebar from "./components/homepage_layout/left_column/Sidebar";
import AppData from "./components/homepage_layout/middle_column/AppData";
import Social from "./components/homepage_layout/right_column/Social";
import FormModal from "./components/modals/FormModal";
import useTokenVerification from "./hooks/useTokenVerification";
import { ModalContext } from "./context/modalContext";
import BotNav from "./components/navigation/BotNav";
import DeleteAccountModal from "./components/modals/DeleteAccountModal";
import { UserContext } from "./context/userContext";
import { removeJwtToken } from "./utils/api/auth/auth_handler";
import deleteAccount from "./utils/api/auth/delete_account";
import { useRouter } from "next/navigation";

const Home = () => {
  useTokenVerification();

  const modalContext = useContext(ModalContext);
  const userContext = useContext(UserContext);
  const router = useRouter();

  const handleDelete = () => {
    const handleSuccess = () => {
      modalContext.setModalDeleteAccount(false)
      userContext.setUser(null);
      removeJwtToken();
      router.push("/login");
    };

    if (userContext.user) {
      deleteAccount(userContext.user._id, handleSuccess);
    }
  };

  return (
    <main>
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex justify-between items-start gap-2 p-2">
        <Sidebar />
        <AppData />
        <Social />
        {modalContext.modalPost && <FormModal />}
        {modalContext.modalDeleteAccount && (
          <DeleteAccountModal handleDelete={handleDelete} />
        )}
      </div>
      <BotNav />
    </main>
  );
};

export default Home;

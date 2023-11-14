import Close from "@/app/utils/assets/svgs/Close";
import FriendRequests from "../socials_users/FriendRequests";
import { ModalContext } from "@/app/context/modalContext";
import { useContext } from "react";

const RequestModal = () => {
  const modalContext = useContext(ModalContext);
  return (
    <div className="md:hidden w-full absolute bg-white dark:bg-gray-800 flex flex-col gap-1 p-2 rounded top-[3.5rem] border-t border-slate-400 drop-shadow">
      <div
        onClick={() => modalContext.setModalBell(false)}
        className="flex justify-between bg-bgContainer"
      >
        <div className="text-xl font-ubuntu-500 self-start text-accent my-1 bg-bgContainer">
          Friend Requests
        </div>
        <Close />
      </div>
      <FriendRequests />
    </div>
  );
};

export default RequestModal;

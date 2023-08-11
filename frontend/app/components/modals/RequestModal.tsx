import Close from "@/app/utils/assets/svgs/Close";
import Title from "../ui_elements/Title";
import FriendRequests from "../socials_users/FriendRequests";
import { ModalContext } from "@/app/context/modalContext";
import { useContext } from "react";

const RequestModal = () => {
  const modalContext = useContext(ModalContext);
  return (
    <div className="md:hidden w-full absolute bg-black flex flex-col gap-1 p-2 rounded shadow-md top-[2.8rem]">
      <div
        onClick={() => modalContext.setModalBell(false)}
        className="flex justify-between"
      >
        <Title title={"Friend requests"} />
        <Close />
      </div>
      <FriendRequests />
    </div>
  );
};

export default RequestModal;

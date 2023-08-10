import useCurrentUser from "@/app/hooks/useCurrentUser";
import Logo from "../../assets/Logo";
import Notification from "../../assets/svgs/Notification";
import AvatarComment from "../images/AvatarComment";
import { useContext } from "react";
import { ModalContext } from "@/app/context/modalContext";
import Close from "@/app/assets/svgs/Close";
import Title from "../Title";
import FriendRequests from "../user/FriendRequests";

const TopNav = () => {
  const { currentUser } = useCurrentUser();
  const modalContext = useContext(ModalContext);

  return (
    <nav className="backdrop-blur-xl bg-black/80 sticky top-0 z-50 flex justify-between md:justify-center items-center py-2 border-solid border-b border-yellow2 md:px-20">
      <div className="px-4">
        <Logo />
      </div>

      <div className="md:hidden gap-2 items-center flex px-4 ">
        <Notification />
        <AvatarComment avatar={currentUser.avatar} userID={currentUser._id} />
      </div>
      {modalContext.modalBell && <RequestModal />}
    </nav>
  );
};

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

export default TopNav;

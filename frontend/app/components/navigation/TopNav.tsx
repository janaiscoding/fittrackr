import useCurrentUser from "@/app/hooks/useCurrentUser";
import Logo from "../../utils/assets/Logo";
import Notification from "../../utils/assets/svgs/Notification";
import AvatarComment from "../images/AvatarComment";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/app/context/modalContext";
import RequestModal from "../modals/RequestModal";
import { UserContext } from "@/app/context/userContext";
import { ImageType } from "@/app/utils/types";
const TopNav = () => {
  const userContext = useContext(UserContext);
  const modalContext = useContext(ModalContext);

  const [avatar, setAvatar] = useState<ImageType>();
  const [userID, setUserID] = useState<string>();
  useEffect(() => {
    if (userContext.user) {
      setAvatar(userContext.user.avatar);
      setUserID(userContext.user._id);
    }
  }, [userContext]);
  return (
    <nav className="drop-shadow-md sticky bg-white top-0 z-50 flex justify-between md:justify-center items-center mb-4 py-2 md:px-20">
      <div className="px-4">
        <Logo />
      </div>
      <div className="md:hidden gap-2 items-center flex px-4 ">
        <Notification />
        {avatar && userID && <AvatarComment avatar={avatar} userID={userID} />}
      </div>
      {modalContext.modalBell && <RequestModal />}
    </nav>
  );
};

export default TopNav;

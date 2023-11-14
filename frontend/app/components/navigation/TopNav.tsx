import Logo from "../../utils/assets/Logo";
import Notification from "../../utils/assets/svgs/Notification";
import AvatarComment from "../images/AvatarComment";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/app/context/modalContext";
import RequestModal from "../modals/RequestModal";
import { UserContext } from "@/app/context/userContext";
import { ImageType } from "@/app/utils/types";
import { ViewContext } from "@/app/context/viewContext";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/app/context/themeContext";
import SunSVG from "@/app/utils/assets/svgs/Sun";
import MoonSVG from "@/app/utils/assets/svgs/Moon";

const TopNav = () => {
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const modalContext = useContext(ModalContext);
  const viewContext = useContext(ViewContext);

  const [avatar, setAvatar] = useState<ImageType>();
  const [userID, setUserID] = useState<string>();
  useEffect(() => {
    if (userContext.user) {
      setAvatar(userContext.user.avatar);
      setUserID(userContext.user._id);
    }
  }, [userContext]);

  const router = useRouter();

  const handleFriendsRedirect = () => {
    viewContext.setCurrent("friends");
    router.push(`/users/${userContext.user?._id}`);
  };

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      themeContext.setCurrent("dark");
    } else {
      themeContext.setCurrent("light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTheme = () => {
    if (themeContext.current === "dark") {
      document.documentElement.classList.remove("dark");
      themeContext.setCurrent("light");
    } else {
      document.documentElement.classList.add("dark");
      themeContext.setCurrent("dark");
    }
  };
  return (
    <header className="shadow-md sticky bg-white dark:bg-gray-800 top-0 z-50 mb-4 py-2 md:block flex justify-between items-center">
      <div className="max-w-7xl md:m-auto px-4 flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex">
          <ul className="flex gap-6">
            <li className="text-secondary hover:text-accent dark:text-white dark:hover:text-accent">
              <a href={`/users/${userContext.user?._id}`}>Profile</a>
            </li>
            <li
              onClick={handleFriendsRedirect}
              className="hover:cursor-pointer text-secondary hover:text-accent dark:text-white dark:hover:text-accent"
            >
              Friends
            </li>
            <li className="text-secondary hover:text-accent dark:text-white dark:hover:text-accent">
              <a href="/users">Users</a>
            </li>
            <li
              onClick={handleTheme}
              className="hover:cursor-pointer text-secondary hover:text-accent dark:text-white dark:hover:text-accent"
            >
              {themeContext.current === "dark" ? <SunSVG /> : <MoonSVG />}
            </li>
          </ul>
        </nav>
      </div>

      <div className="md:hidden gap-2 items-center flex px-4 ">
        <div onClick={handleTheme}>
          {themeContext.current === "dark" ? <SunSVG /> : <MoonSVG />}
        </div>
        <Notification />
        {avatar && userID && <AvatarComment avatar={avatar} userID={userID} />}
      </div>
      {modalContext.modalBell && <RequestModal />}
    </header>
  );
};

export default TopNav;

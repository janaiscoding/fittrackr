import useCurrentUser from "@/app/hooks/useCurrentUser";
import Logo from "../../assets/Logo";
import Notification from "../../assets/svgs/Notification";
import AvatarComment from "../post_article/AvatarComment";

const TopNav = () => {
  const currentUser = useCurrentUser();
  return (
    <nav className="backdrop-blur-xl bg-black/80 sticky top-0 z-50 flex justify-between md:justify-center items-center py-2 px-4 border-solid border-b border-yellow2 md:px-20">
      <Logo />
      <div className="md:hidden gap-2 items-center flex">
        <Notification />
        <AvatarComment avatar={currentUser.avatar} userID={currentUser._id} />
      </div>
    </nav>
  );
};

export default TopNav;

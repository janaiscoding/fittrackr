import { useRouter } from "next/navigation";
import { removeJwtToken } from "../api/auth/auth_handler";
import Community from "../assets/svgs/Community";
import FriendsSVG from "../assets/svgs/Friends";
import SignOut from "../assets/svgs/SignOut";
import useCurrentUser from "../hooks/useCurrentUser";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import WheelSVG from "../assets/svgs/Settings";
import ThemeSVG from "../assets/svgs/Theme";

const SettingsList = () => {
  const currentUser = useCurrentUser();
  const userContext = useContext(UserContext);

  const router = useRouter();

  const handleSignout = () => {
    userContext.setUser(null);
    removeJwtToken();
    router.push("/login");
  };
  const handleTheme = () => {
    console.log("theme toggle");
  };

  return (
    <div className="flex text-lg flex-col bg-blue">
      <a
        href={`/settings`}
        className="flex gap-4 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-yellow "
      >
        <WheelSVG />
        <p>Edit Profile</p>
      </a>
      <div
        onClick={handleTheme}
        className="flex gap-4 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-yellow border-b border-grey"
      >
        <ThemeSVG />
        <p>Change Theme</p>
      </div>
      <div
        onClick={handleSignout}
        className="flex gap-4 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-yellow border-b border-grey"
      >
        <SignOut />
        <p>Sign out</p>
      </div>
    </div>
  );
};

export default SettingsList;
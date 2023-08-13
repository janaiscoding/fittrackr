import { useRouter } from "next/navigation";
import { removeJwtToken } from "../../../utils/api/auth/auth_handler";
import SignOut from "../../../utils/assets/svgs/SignOut";
import { UserContext } from "../../../context/userContext";
import { useContext } from "react";
import WheelSVG from "../../../utils/assets/svgs/Settings";
import ThemeSVG from "../../../utils/assets/svgs/Theme";

const SettingsList = () => {
  const currentUser = useContext(UserContext);

  const router = useRouter();

  const handleSignout = () => {
    currentUser.setUser(null);
    removeJwtToken();
    router.push("/login");
  };
  const handleTheme = () => {
    console.log("theme toggle");
  };

  return (
    <div className="flex text-lg flex-col bg-bgContainers">
      <a
        href={`/settings`}
        className="flex gap-4 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-accent border-b border-grey"
      >
        <WheelSVG />
        <p>Edit Profile</p>
      </a>
      <div
        onClick={handleTheme}
        className="flex gap-4 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-accent border-b border-grey"
      >
        <ThemeSVG />
        <p>Change Theme</p>
      </div>
      <div
        onClick={handleSignout}
        className="flex gap-4 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-accent border-b border-grey"
      >
        <SignOut />
        <p>Sign out</p>
      </div>
    </div>
  );
};

export default SettingsList;

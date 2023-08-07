import { useRouter } from "next/navigation";
import { removeJwtToken } from "../api/auth/auth_handler";
import Community from "../assets/svgs/Community";
import FriendsSVG from "../assets/svgs/Friends";
import SignOut from "../assets/svgs/SignOut";
import useCurrentUser from "../hooks/useCurrentUser";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

const SettingsList = () => {
  const currentUser = useCurrentUser();
  const userContext = useContext(UserContext);

  const router = useRouter();

  const handleSignout = () => {
    userContext.setUser(null);
    removeJwtToken();
    router.push("/login");
  };

  return (
    <div className="flex text-lg flex-col bg-blue">
      <a
        href={`/users/${currentUser._id}/settings`}
        className="flex gap-4 items-center p-2 hover:bg-black/30 hover:cursor-pointer hover:text-yellow "
      >
        <Community />
        <p>Settings</p>
      </a>
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

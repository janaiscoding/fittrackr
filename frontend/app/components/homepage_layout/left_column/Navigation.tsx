import { useContext } from "react";
import { ViewContext } from "../../../context/viewContext";
import Dumbbell from "../../../utils/assets/svgs/Dumbbell";
import Community from "../../../utils/assets/svgs/Community";
import HomeSVG from "../../../utils/assets/svgs/Home";
import FriendsSVG from "../../../utils/assets/svgs/Friends";
import User from "../../../utils/assets/svgs/User";
import { UserContext } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import { removeJwtToken } from "@/app/utils/api/auth/auth_handler";
import WheelSVG from "@/app/utils/assets/svgs/Settings";
import SignOut from "@/app/utils/assets/svgs/SignOut";

const NavigationList = () => {
  const viewContext = useContext(ViewContext);
  const currentUser = useContext(UserContext);

  const router = useRouter();

  const handleSignout = () => {
    currentUser.setUser(null);
    removeJwtToken();
    router.push("/login");
  };

  const handleFriendsRedirect = () => {
    viewContext.setCurrent("friends");
    router.push(`/users/${currentUser.user?._id}`);
  };

  return (
    <div className="flex text-lg flex-col">
      <a
        href={`/users/${currentUser.user?._id}`}
        className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent drop-shadow my-2 bg-bgContainers"
      >
        <User />
        <p>Profile</p>
      </a>
      <div
        onClick={handleFriendsRedirect}
        className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent drop-shadow my-2 bg-bgContainers"
      >
        <FriendsSVG />
        <p>Friends</p>
      </div>
      <a
        href="/users"
        className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent drop-shadow my-2 bg-bgContainers"
      >
        <Community />
        <p>Community</p>
      </a>
      <div
        onClick={handleSignout}
        className="flex gap-4 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent drop-shadow my-2 bg-bgContainers"
      >
        <SignOut />
        <p>Sign out</p>
      </div>
    </div>
  );
};
export default NavigationList;

import { SetStateAction, useContext } from "react";
import { ViewContext } from "../../../context/viewContext";
import Community from "../../../utils/assets/svgs/Community";
import FriendsSVG from "../../../utils/assets/svgs/Friends";
import User from "../../../utils/assets/svgs/User";
import { UserContext } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import { removeJwtToken } from "@/app/utils/api/auth/auth_handler";
import SignOut from "@/app/utils/assets/svgs/SignOut";
import Trash from "@/app/utils/assets/svgs/Trash";

type NavProps = {
  setShowDelAcc: React.Dispatch<SetStateAction<boolean>>;
  isDemo: boolean;
  setWarning: React.Dispatch<SetStateAction<boolean>>;
};

const NavigationList = ({ setShowDelAcc, isDemo, setWarning }: NavProps) => {
  const viewContext = useContext(ViewContext);
  const userContext = useContext(UserContext);

  const router = useRouter();

  const handleSignout = () => {
    userContext.setUser(null);
    removeJwtToken();
    router.push("/login");
  };

  const handleFriendsRedirect = () => {
    viewContext.setCurrent("friends");
    router.push(`/users/${userContext.user?._id}`);
  };

  return (
    <div className="flex text-lg flex-col gap-1 bg-bgContainers">
      {userContext.user ? (
        <a
          href={`/users/${userContext.user._id}`}
          className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent shadow-md bg-bgContainers"
        >
          <User />
          <p>My Profile</p>
        </a>
      ) : (
        <div className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent shadow-md bg-bgContainers">
          <User />
          <p>Loading...</p>
        </div>
      )}

      <div
        onClick={handleFriendsRedirect}
        className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent shadow-md bg-bgContainers"
      >
        <FriendsSVG />
        <p>My Friends</p>
      </div>
      <a
        href="/users"
        className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent shadow-md bg-bgContainers"
      >
        <Community />
        <p>All Users</p>
      </a>

      {isDemo ? (
        <div
          onClick={() => {
            setWarning(true);
          }}
          className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent shadow-md bg-bgContainers"
        >
          <Trash />
          <p>Delete demo</p>
        </div>
      ) : (
        <div
          onClick={() => {
            setShowDelAcc(true);
          }}
          className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent shadow-md bg-bgContainers"
        >
          <Trash />
          <p>Delete Account</p>
        </div>
      )}
      <div
        onClick={handleSignout}
        className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent shadow-md bg-bgContainers"
      >
        <SignOut />
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default NavigationList;

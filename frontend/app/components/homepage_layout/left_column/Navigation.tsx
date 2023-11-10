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
import { ModalContext } from "@/app/context/modalContext";

type NavProps = {
  isDemo: boolean;
};

const NavigationList = ({ isDemo }: NavProps) => {
  const viewContext = useContext(ViewContext);
  const userContext = useContext(UserContext);
  const modalContext = useContext(ModalContext)
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
          aria-label="Link to go to your profile"
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

      <button
        aria-label="Button go to your friends lists"
        onClick={handleFriendsRedirect}
        className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent shadow-md bg-bgContainers"
      >
        <FriendsSVG />
        <p>My Friends</p>
      </button>
      <a
        aria-label="Link to go to all users"
        href="/users"
        className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent shadow-md bg-bgContainers"
      >
        <Community />
        <p>All Users</p>
      </a>

      {isDemo ? (
        <button
          aria-label="Not allowed to delete the demo account"
          className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-not-allowed hover:text-accent shadow-md bg-bgContainers"
          disabled={true}
        >
          <Trash />
          <p>Delete Account</p>
        </button>
      ) : (
        <button
          aria-label="Delete your account button"
          onClick={() => {
            modalContext.setModalDeleteAccount(true);
          }}
          className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent shadow-md bg-bgContainers"
        >
          <Trash />
          <p>Delete Account</p>
        </button>
      )}
      <button
        aria-label="Click this button for signing out"
        onClick={handleSignout}
        className="flex gap-2 items-center p-2 text-secondary hover:bg-accent/30 hover:cursor-pointer hover:text-accent shadow-md bg-bgContainers"
      >
        <SignOut />
        <p>Sign Out</p>
      </button>
    </div>
  );
};

export default NavigationList;

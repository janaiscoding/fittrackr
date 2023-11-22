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
  const modalContext = useContext(ModalContext);
  const router = useRouter();

  const handleSignout = () => {
    userContext.setUser(null);
    removeJwtToken();
    router.push("/login");
  };

  const handleFriendsRedirect = () => {
    viewContext.setCurrent("friends");
    if (userContext.user) {
      router.push(`/users/${userContext.user._id}`);
    }
  };

  return (
    <div className="flex text-lg flex-col gap-1">
      {userContext.user ? (
        <a
          aria-label="Link to go to your profile"
          href={`/users/${userContext.user._id}`}
          className="navigation__group"
        >
          <User />
          <p>Profile</p>
        </a>
      ) : (
        <div className="navigation__group">
          <User />
          <p>Loading...</p>
        </div>
      )}

      <button
        aria-label="Button go to your friends lists"
        onClick={handleFriendsRedirect}
        className="navigation__group"
      >
        <FriendsSVG />
        <p>Friends</p>
      </button>
      <a
        aria-label="Link to go to all users"
        href="/users"
        className="navigation__group"
      >
        <Community />
        <p>Users</p>
      </a>

      {isDemo ? (
        <button
          aria-label="Not allowed to delete the demo account"
          className="navigation__group__not__allowed"
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
          className="navigation__group"
        >
          <Trash />
          <p>Delete Account</p>
        </button>
      )}
      <button
        aria-label="Click this button for signing out"
        onClick={handleSignout}
        className="navigation__group"
      >
        <SignOut />
        <p>Sign Out</p>
      </button>
    </div>
  );
};

export default NavigationList;

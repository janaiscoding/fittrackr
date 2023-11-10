import { User } from "../../../utils/types";
import Loader from "../../../utils/assets/Loader";
import useCurrentUser from "../../../hooks/useCurrentUser";
import NavigationList from "./Navigation";
import SidebarAvatar from "../../images/SidebarAvatar";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import { ViewContext } from "@/app/context/viewContext";
import { removeJwtToken } from "@/app/utils/api/auth/auth_handler";
import deleteAccount from "@/app/utils/api/auth/delete_account";
import DeleteAccountModal from "../../modals/DeleteAccountModal";
import DeleteNotAllowed from "../../modals/DeleteNotAllowed";

const Sidebar = () => {
  const { currentUser, isLoadingUser } = useCurrentUser();

  const userContext = useContext(UserContext);

  const [showDelAcc, setShowDelAcc] = useState(false);
  const [warning, setWarning] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  const handleDelete = () => {
    const handleSuccess = () => {
      userContext.setUser(null);
      removeJwtToken();
    };

    if (userContext.user) {
      deleteAccount(userContext.user._id, handleSuccess);
    }
  };
  useEffect(() => {
    if (userContext.user) {
      setIsDemo(userContext.user._id === process.env.NEXT_PUBLIC_DEMO_ID);
    }
  }, [userContext]);

  return (
    <div className="hidden md:block sticky top-20 w-1/2">
      <div
        className={`${
          isLoadingUser && "self-center flex items-center justify-center"
        }`}
      >
        {isLoadingUser ? <Loader /> : <UserPreview currentUser={currentUser} />}
      </div>

      <div className="text-xl font-ubuntu-500 self-start text-accent mt-10">
        Navigation
      </div>
      <NavigationList
        setShowDelAcc={setShowDelAcc}
        isDemo={isDemo}
        setWarning={setWarning}
      />

      {showDelAcc && (
        <DeleteAccountModal
          handleDelete={handleDelete}
          setShowDelModal={setShowDelAcc}
        />
      )}
      {warning && <DeleteNotAllowed setWarning={setWarning} />}
    </div>
  );
};

export default Sidebar;
//@ts-ignore

const UserPreview = ({ currentUser }: { currentUser: User }) => {
  return (
    <div className="bg-bgContainers shadow-md">
      <div className="bg-secondary/10 flex items-center flex-col gap-1 basis-full p-2">
        <SidebarAvatar avatar={currentUser.avatar} userID={currentUser._id} />
        <a
          href={`/users/${currentUser._id}`}
          className="text-secondary font-ubuntu-500 text-xl text-center hover:text-accent"
        >
          {currentUser.first_name} {currentUser.last_name}
        </a>
      </div>
      <p className="text-secondary text-sm text-center p-4">
        {currentUser.bio}
      </p>
    </div>
  );
};

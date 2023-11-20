import useCurrentUser from "../../../hooks/useCurrentUser";
import NavigationList from "./Navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import LoaderUser from "../../ui_elements/LoaderUser";
import UserWrapperWithPosts from "../../socials_users/UserWrapperWithPosts";

const Sidebar = () => {
  const { currentUser, isLoadingUser } = useCurrentUser();

  const userContext = useContext(UserContext);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    if (userContext.user) {
      setIsDemo(userContext.user._id === process.env.NEXT_PUBLIC_DEMO_ID);
    }
  }, [userContext]);

  return (
    <div className="hidden sticky md:block top-20 w-1/2">
      <div
        className={`${
          isLoadingUser && "self-center flex items-center justify-center"
        }`}
      >
        {isLoadingUser ? (
          <LoaderUser />
        ) : (
          <div className="bg-bgContainers dark:bg-gray-800 shadow-md">
          <UserWrapperWithPosts currentUser={currentUser} />
          <p className="text-secondary dark:text-gray-300 text-center p-4">
            {currentUser.bio}
          </p>
        </div>
        )}
      </div>

      <div className="text-xl font-ubuntu-500 self-start text-accent dark:text-gray-300 mt-10">
        Navigation
      </div>
      <NavigationList isDemo={isDemo} />
    </div>
  );
};

export default Sidebar;
//@ts-ignore

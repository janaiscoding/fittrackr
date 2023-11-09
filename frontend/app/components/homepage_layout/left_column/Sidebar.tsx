import { User } from "../../../utils/types";
import Loader from "../../../utils/assets/Loader";
import useCurrentUser from "../../../hooks/useCurrentUser";
import NavigationList from "./Navigation";
import SidebarAvatar from "../../images/SidebarAvatar";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { currentUser, isLoadingUser } = useCurrentUser();

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
      <NavigationList />
    </div>
  );
};

export default Sidebar;
//@ts-ignore
// import ColorThief from "../../../../node_modules/colorthief/dist/color-thief.mjs";

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

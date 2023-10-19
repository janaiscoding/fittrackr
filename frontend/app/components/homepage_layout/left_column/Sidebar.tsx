import { User } from "../../../utils/types";
import Loader from "../../../utils/assets/Loader";
import useCurrentUser from "../../../hooks/useCurrentUser";
import NavigationList from "./Navigation";
import SidebarAvatar from "../../images/SidebarAvatar";

const Sidebar = () => {
  const { currentUser, isLoadingUser } = useCurrentUser();

  return (
    <div className="hidden md:block w-1/2">
      <div className={`${isLoadingUser && "self-center"} flex`}>
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

const UserPreview = ({ currentUser }: { currentUser: User }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-bgContainers drop-shadow-md p-4 gap-1 basis-full">
      <SidebarAvatar avatar={currentUser.avatar} userID={currentUser._id} />
      <a
        href={`/users/${currentUser._id}`}
        className="text-secondary font-ubuntu-500 text-xl text-center hover:text-accent"
      >
        {currentUser.first_name} {currentUser.last_name}
      </a>
      <p className="text-secondary text-sm text-center">{currentUser.bio}</p>
    </div>
  );
};

import { User } from "../../../utils/__types__/types";
import Loader from "../../../utils/assets/Loader";
import Title from "../../ui_elements/Title";
import AvatarPost from "../../images/AvatarPost";
import useCurrentUser from "../../../hooks/useCurrentUser";
import NavigationList from "./Navigation";
import SettingsList from "./Settings";

const Sidebar = () => {
  const { currentUser, isLoadingUser } = useCurrentUser();

  return (
    <div className="hidden md:flex flex-col w-1/2 gap-4">
      <div className={`${isLoadingUser && "self-center"} flex`}>
        {isLoadingUser ? <Loader /> : <UserPreview currentUser={currentUser} />}
      </div>
      <Title title={"Navigation"} />
      <NavigationList />
      <Title title={"Settings"} />
      <SettingsList />
    </div>
  );
};

export default Sidebar;

const UserPreview = ({ currentUser }: { currentUser: User }) => {
  return (
    <div className="flex flex-col items-center bg-blue p-4 rounded gap-1 basis-full">
      <AvatarPost avatar={currentUser.avatar} userID={currentUser._id} />
      <a
        href={`/users/${currentUser._id}`}
        className="text-yellow font-ubuntu-500 text-2xl"
      >
        {currentUser.first_name} {currentUser.last_name}
      </a>
      <p className="text-white2">{currentUser.bio}</p>
    </div>
  );
};

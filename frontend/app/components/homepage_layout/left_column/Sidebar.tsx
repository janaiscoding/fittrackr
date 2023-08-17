import { User } from "../../../utils/types";
import Loader from "../../../utils/assets/Loader";
import Title from "../../ui_elements/Title";
import AvatarPost from "../../images/AvatarPost";
import useCurrentUser from "../../../hooks/useCurrentUser";
import NavigationList from "./Navigation";
import SettingsList from "./Settings";

const Sidebar = () => {
  const { currentUser, isLoadingUser } = useCurrentUser();

  return (
    <div className="hidden gap-4 md:block w-1/2">
      <div className={`${isLoadingUser && "self-center"} flex`}>
        {isLoadingUser ? <Loader /> : <UserPreview currentUser={currentUser} />}
      </div>
      <Title title={"Navigation"} />
      <NavigationList />
      <Title title={"Preferences"} />
      <SettingsList />
    </div>
  );
};

export default Sidebar;

const UserPreview = ({ currentUser }: { currentUser: User }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-bgContainers p-4 rounded gap-1 basis-full">
      <AvatarPost avatar={currentUser.avatar} userID={currentUser._id} />
      <a
        href={`/users/${currentUser._id}`}
        className="text-accent font-ubuntu-500 text-xl text-center"
      >
        {currentUser.first_name} {currentUser.last_name}
      </a>
      <p className="text-softWhite text-sm text-center">{currentUser.bio}</p>
    </div>
  );
};

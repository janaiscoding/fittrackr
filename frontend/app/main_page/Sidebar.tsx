import Loader from "../assets/Loader";
import Title from "../components/Title";
import AvatarPost from "../components/images/AvatarPost";
import useCurrentUser from "../hooks/useCurrentUser";
import useLoadingUser from "../hooks/useLoadingUser";
import NavigationList from "./Navigation";
import SettingsList from "./Settings";

const Sidebar = () => {
  const isLoadingUser = useLoadingUser();
  const currentUser = useCurrentUser();

  return (
    <div className="hidden md:flex flex-col w-1/2 gap-4">
      <div className={`${isLoadingUser && "self-center"} flex`}>
        {isLoadingUser ? (
          <Loader />
        ) : (
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
        )}
      </div>
      <Title title={"Navigation"} />
      <NavigationList />
      <Title title={"Settings"} />
      <SettingsList />
    </div>
  );
};

export default Sidebar;

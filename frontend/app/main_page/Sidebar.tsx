import Loader from "../assets/Loader";
import AvatarPost from "../components/images/AvatarPost";
import useCurrentUser from "../hooks/useCurrentUser";
import useLoadingUser from "../hooks/useLoadingUser";
import NavigationList from "./Navigation";
import SettingsList from "./Settings";

const Sidebar = () => {
  const isLoadingUser = useLoadingUser();
  const currentUser = useCurrentUser();

  return (
    <div className="hidden md:flex flex-col w-1/2 gap-4 item">
      <div className="flex items-center">
        {isLoadingUser ? (
          <Loader />
        ) : (
          <div className="flex flex-col items-center bg-blue p-4 rounded gap-1 basis-full">
            <AvatarPost avatar={currentUser.avatar} userID={currentUser._id} />
            <p className="text-yellow font-ubuntu-500 text-2xl">
              {currentUser.first_name} {currentUser.last_name}
            </p>
            <p className="text-white2">{currentUser.bio}</p>
            <button className="flex gap-1 items-center justify-between border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded">
              Go to profile
            </button>
          </div>
        )}
      </div>
      <div className="text-xl font-ubuntu-500 self-start border-b-2 border-yellow ml-2">
        Navigation
      </div>
      <NavigationList />

      <div className="text-xl font-ubuntu-500 self-start border-b-2 border-yellow2 ml-2">
        Settings
      </div>
      <SettingsList />
    </div>
  );
};

export default Sidebar;

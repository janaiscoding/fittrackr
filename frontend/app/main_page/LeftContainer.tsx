import Loader from "../assets/Loader";
import AvatarPost from "../components/images/AvatarPost";
import useCurrentUser from "../hooks/useCurrentUser";
import useLoadingUser from "../hooks/useLoadingUser";

const LeftContainer = () => {
  const isLoadingUser = useLoadingUser();
  const currentUser = useCurrentUser();

  return (
    <div className="hidden md:flex flex-col w-1/2 gap-4">
      <div>
        {isLoadingUser ? (
          <Loader />
        ) : (
          <div className="flex flex-col items-center bg-blue p-4 rounded gap-1">
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
      <div className="flex flex-col">
        <div className="text-xl font-ubuntu-500 self-start border-b-2 border-yellow2 mb-2">
          Workouts
        </div>
        <p>Record a new workout</p>
        <p className="bg-blue p-2 rounded">
          <span className="text-yellow">Username</span> just finished:{" "}
          <span className="text-yellow"> 50 push-ups </span>
        </p>
      </div>
      <div className="flex flex-col items-start">
        <div className="text-xl font-ubuntu-500 self-start border-b-2 border-yellow2 mb-2">
          Navigation
        </div>
        <button>Feed</button>
        <button>Workouts</button>
        <a href={`/users/${currentUser._id}/friends`}>Friends</a>
        <a href="/community">Community</a>
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-ubuntu-500 self-start border-b-2 border-yellow2 mb-2">
          Settings
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;

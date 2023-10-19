import Loader from "../../utils/assets/Loader";
import useFriendRequests from "../../hooks/useFriendRequests";
import SocializeMember from "./SocializeMember";

const FriendRequests = () => {
  const { friendRequests, isLoading } = useFriendRequests();
  return (
    <div className="flex justify-center">
      {isLoading ? (
        <Loader />
      ) : friendRequests.length === 0 ? (
        <p className="w-full self-center text-secondary drop-shadow bg-bgContainers p-2">You currently don&apos;t have any friend requests.</p>
      ) : (
        <div className="w-full flex flex-col gap-1">
          {friendRequests.map((user) => (
            <SocializeMember key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;

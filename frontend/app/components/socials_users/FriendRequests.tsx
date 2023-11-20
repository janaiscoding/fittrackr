import FriedRequestWrapper from "./FriedRequestWrapper";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import getFriendRequests from "@/app/utils/api/friends/get_friend_requests";
import { User } from "@/app/utils/types";

const FriendRequests = () => {
  const currentUser = useContext(UserContext);
  // After receiving the logged in user id, I do an API call which fetches all the important info from the /received Endpoint
  const [friendRequests, setFRs] = useState([] as User[]);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    if (currentUser.user?._id) {
      getFriendRequests(currentUser.user._id, setFRs, () => {
        setLoading(false);
      });
    }
  }, [currentUser.user]);

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <LoaderFriendRequests />
      ) : friendRequests.length === 0 ? (
        <p className="w-full self-center text-secondary dark:text-gray-400 bg-bgContainers dark:bg-gray-800 p-2">
          You currently don&apos;t have any friend requests.
        </p>
      ) : (
        <div className="w-full flex flex-col gap-1">
          {friendRequests.map((user) => (
            <FriedRequestWrapper key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

const LoaderFriendRequests = () => {
  return (
    <div className="bg-bgContainers animate-loading w-full h-full shadow-md flex flex-col items-center justify-center">
      <div className="flex items-center gap-1 p-2">
        <div className="w-12 h-12 rounded-full avatar-image bg-gray-200/10"></div>
        <div className="flex flex-col gap-1">
          <div className="animate-text w-32 h-4"></div>
          <div className="flex gap-1">
            <div className="animate-text w-20 h-2"></div>
            <div className="animate-text w-20 h-2"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-8 bg-gray-600/10 flex items-center justify-center">
        <div className="animate-text w-20 h-6 m-4"></div>
      </div>
    </div>
  );
};

export default FriendRequests;

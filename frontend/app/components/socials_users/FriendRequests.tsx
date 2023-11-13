import Loader from "../../utils/assets/Loader";
import useFriendRequests from "../../hooks/useFriendRequests";
import UserWrapper from "./UserWrapper";
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
        <Loader />
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

export default FriendRequests;

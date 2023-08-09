import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import getFriendRequests from "../api/users/get_friend_requests";
import { User } from "../__types__/types";

const useFriendRequests = () => {
  const currentUser = useCurrentUser();

  const [friendRequests, setFriendRequests] = useState<User[]>(
    [] as User[]
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser.requestsReceived) {
      getFriendRequests(currentUser._id, setFriendRequests);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return friendRequests;
};
export default useFriendRequests;

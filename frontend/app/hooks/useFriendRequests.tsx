import { useEffect, useState } from "react";
import { CommunityUser, User } from "../__types__/types";
import useCurrentUser from "./useCurrentUser";
import getFriendRequests from "../api/users/get_friend_requests";

const useFriendRequests = () => {
  const currentUser = useCurrentUser();

  const [friendRequests, setFriendRequests] = useState<CommunityUser[]>([] as CommunityUser[]);

  const fetchFriendRequests = () => {
    setFriendRequests([]);
    currentUser.requestsReceived.forEach((userID) =>
      getFriendRequests(userID, setFriendRequests)
    );
  };

  useEffect(() => {
    if (currentUser.requestsReceived) {
      fetchFriendRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return friendRequests;
};
export default useFriendRequests;

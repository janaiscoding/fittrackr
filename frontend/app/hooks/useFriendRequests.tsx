import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import getFriendRequests from "../utils/api/users/get_friend_requests";
import { User } from "../utils/types";


// This will retreive all friend requests. Used on Mobile view under notification bell, and on desktop on right_column
const useFriendRequests = () => {
  const { currentUser } = useCurrentUser();

  const [friendRequests, setFriendRequests] = useState<User[]>([] as User[]);
  const [isLoading, setLoading] = useState(true);
  const handleSuccess = () => {
    setLoading(false)
  }
  useEffect(() => {
    if (currentUser.requestsReceived) {
      getFriendRequests(currentUser._id, setFriendRequests, handleSuccess);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return {friendRequests, isLoading};
};
export default useFriendRequests;

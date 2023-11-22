import { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/userContext";
import getFriends from "../utils/api/users/get_friends";
import { User } from "../utils/types";

const useFriendsList = (userID: string) => {
  const [friends, setFriends] = useState([] as User[]);
  const [isLoading, setIsLoading] = useState(true);

  const userContext = useContext(UserContext);

  const handleSuccess = (dataFriends: User[]) => {
    setFriends(dataFriends);
    setIsLoading(false);
  };
  useEffect(() => {
    // In case this calls for currentUser, always refresh on changes (from main page etc.)
    if (userContext.user && userID === userContext.user._id) {

      getFriends(userContext.user._id, handleSuccess);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user]);

  useEffect(() => {
    //Otherwise just check once.
    if (userContext.user && userID !== userContext.user._id) {
      getFriends(userID, handleSuccess);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { friends, isLoading };
};

export default useFriendsList;

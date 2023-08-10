import { useContext, useEffect, useState } from "react";
import { User } from "../__types__/types";
import { UserContext } from "../context/userContext";
import getFriends from "../api/users/get_friends";

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
    if (userID === userContext.user?._id) {
      getFriends(userContext.user._id, handleSuccess);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user?.friends]);

  useEffect(() => {
    //Otherwise just check once.
    if (userID !== userContext.user?._id) {
      getFriends(userID, handleSuccess);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { friends, isLoading };
};

export default useFriendsList;

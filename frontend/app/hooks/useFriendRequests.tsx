import { useContext, useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import { User } from "../utils/types";
import UserContent from "../components/profile/UserContent";
import { UserContext } from "../context/userContext";

// This will retreive all friend requests. Used on Mobile view under notification bell, and on desktop on right_column
const useFriendRequests = () => {
  const currentUser = useContext(UserContext);
 
  useEffect(() => {
    if (currentUser.user) {
      console.log(currentUser.user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);


};
export default useFriendRequests;

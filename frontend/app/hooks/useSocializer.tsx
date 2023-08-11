import { useContext, useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";

import { UserContext } from "../context/userContext";
import getUser from "../api/users/get_user";
import cancelRequest from "../api/friends/cancel_request";
import sendRequest from "../api/friends/send_request";
import acceptRequest from "../api/friends/accept_request";
import declineRequest from "../api/friends/decline_request";
import removeFriend from "../api/friends/remove_friend";
import { User } from "../__types__/types";

const useSocializer = (targetUser: User) => {
  const { currentUser } = useCurrentUser();
  const userContext = useContext(UserContext);

  const [isFriends, setIsFriends] = useState<boolean>();
  const [isPending, setIsPending] = useState<boolean>();
  const [isReceived, setIsReceived] = useState<boolean>();

  const handleAdd = () => {
    // Toggle On/Off outcoming friend request
    isPending
      ? cancelRequest(targetUser._id, currentUser._id, handlePending)
      : sendRequest(targetUser._id, currentUser._id, handlePending);
  };
  const handlePending = (status: string) => {
    if (status === "sent") {
      setIsPending(true);
    } else if (status === "canceled") {
      setIsPending(false);
    }
  };

  const handleAccept = () => {
    acceptRequest(targetUser._id, currentUser._id, handleSuccess);
  };

  const handleDecline = () => {
    declineRequest(targetUser._id, currentUser._id, handleSuccess);
  };

  const handleRemove = () => {
    removeFriend(targetUser._id, currentUser._id, handleSuccess);
  };

  const handleSuccess = () => {
    //Refresh app context - the friendship statuses will get re-rendered
    getUser(currentUser._id, userContext.setUser);
  };

  useEffect(() => {
    // Establish the friendship status between currentUser and each target community user.
    if (currentUser._id) {
      setIsFriends(targetUser.friends.includes(currentUser._id));
      setIsReceived(currentUser.requestsReceived?.includes(targetUser._id));
      setIsPending(targetUser.requestsReceived.includes(currentUser._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  // Only fetch the statuses for button states and handlers for button onClicks
  return {
    isFriends,
    isPending,
    isReceived,
    handleAccept,
    handleAdd,
    handleDecline,
    handleRemove,
  };
};
export default useSocializer;

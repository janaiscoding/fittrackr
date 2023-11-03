import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import cancelRequest from "../utils/api/friends/cancel_request";
import sendRequest from "../utils/api/friends/send_request";
import acceptRequest from "../utils/api/friends/accept_request";
import declineRequest from "../utils/api/friends/decline_request";
import removeFriend from "../utils/api/friends/remove_friend";
import { User } from "../utils/types";
import getProfile from "../utils/api/users/get_profile";

const useSocializer = (targetUser: User) => {
  const userContext = useContext(UserContext);

  const [isFriends, setIsFriends] = useState<boolean>();
  const [isPending, setIsPending] = useState<boolean>();
  const [isReceived, setIsReceived] = useState<boolean>();

  const handleAdd = () => {
    sendRequest(targetUser._id, userContext.user?._id, handleSuccess);
  };
  const handleCancel = () => {
    cancelRequest(targetUser._id, userContext.user?._id, handleSuccess);
  };
  const handleAccept = () => {
    acceptRequest(targetUser._id, userContext.user?._id, handleSuccess);
  };

  const handleDecline = () => {
    declineRequest(targetUser._id, userContext.user?._id, handleSuccess);
  };

  const handleRemove = () => {
    removeFriend(targetUser._id, userContext.user?._id, handleSuccess);
  };

  const handleSuccess = () => {
    //Refresh app context - the friendship statuses will get re-rendered - necessary for UI refreshes
    //@ts-ignore
    getProfile(userContext.user?._id, userContext.setUser, () => {});
  };

  useEffect(() => {
    // Establish the friendship status between currentUser and each target community user.
    if (userContext.user) {
      setIsFriends(userContext.user.friends?.includes(targetUser._id));
      setIsReceived(
        userContext.user.requestsReceived?.includes(targetUser._id)
      );
      setIsPending(userContext.user.requestsSent?.includes(targetUser._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext]);

  // Only fetch the statuses for button states and handlers for button onClicks
  return {
    isFriends,
    isPending,
    isReceived,
    handleAccept,
    handleAdd,
    handleCancel,
    handleDecline,
    handleRemove,
  };
};
export default useSocializer;

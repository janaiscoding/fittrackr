import { useContext, useEffect, useState } from "react";
import { CommunityUser, ShortUser } from "../__types__/types";
import { UserContext } from "../context/userContext";
import removeFriend from "../api/friends/remove_friend";
import cancelRequest from "../api/friends/cancel_request";
import sendRequest from "../api/friends/send_request";
import acceptRequest from "../api/friends/accept_request";
import declineRequest from "../api/friends/decline_request";
import CommunityPicture from "../ui_components/images/CommunityPicture";

const UserComponent = ({ user }: { user: CommunityUser }) => {
  const { _id, first_name, last_name, avatar, posts, workouts, friends } = user;
  const userContext = useContext(UserContext);

  const [isFriends, setIsFriends] = useState<boolean>();
  const [isPending, setIsPending] = useState<boolean>();
  const [isReceived, setIsReceived] = useState<boolean>();

  const handleAdd = () => {
    if (isPending) {
      cancelRequest(_id, userContext.user?._id).then(() => setIsPending(false));
    } else {
      sendRequest(_id, userContext.user?._id).then(() => setIsPending(true));
    }
  };
  const handleAccept = () => {
    acceptRequest(_id, userContext.user?._id).then(() => {
      setIsReceived(false);
      setIsPending(false);
      setIsFriends(true);
    });
  };
  const handleDecline = () => {
    declineRequest(_id, userContext.user?._id).then(() => {
      setIsReceived(false);
      setIsPending(false);
      setIsFriends(false);
    });
  };
  const handleRemove = () => {
    removeFriend(_id, userContext.user?._id).then(() => setIsFriends(false));
  };

  useEffect(() => {
    if (userContext.user && user) {
      setIsFriends(user.friends.includes(userContext.user._id));
      setIsReceived(userContext.user?.requestsReceived?.includes(user._id));
      setIsPending(user.requestsReceived.includes(userContext.user._id));
      setIsFriends(user.friends.includes(userContext.user!._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext, user]);
  return (
    <div className="border border-mid-green p-4 mb-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
        <CommunityPicture avatar={avatar} userID={_id} />
        <a href={`/users/${_id}`} className="text-green">
          {first_name} {last_name}
        </a>
        </div>
        <div>
          {isFriends && (
            <button className="social-button" onClick={handleRemove}>
              Remove
            </button>
          )}
          {isReceived && (
            <div>
              <button className="social-button" onClick={handleAccept}>
                Accept
              </button>{" "}
              <button className="social-button" onClick={handleDecline}>
                Decline
              </button>
            </div>
          )}
          {!isReceived && !isFriends && (
            <button className="social-button" onClick={handleAdd}>
              {isPending ? "Cancel" : "Add"}
            </button>
          )}
        </div>
      </div>
      <div className="flex text-xs text-grey gap-2">
        <p>{posts.length} posts</p>
        <p>{workouts.length} workouts</p>
        <p>{friends.length} friends</p>
      </div>
    </div>
  );
};

export default UserComponent;

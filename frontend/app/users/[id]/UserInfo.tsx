import { User } from "@/app/__types__/types";
import acceptRequest from "@/app/api/friends/accept_request";
import cancelRequest from "@/app/api/friends/cancel_request";
import declineRequest from "@/app/api/friends/decline_request";
import removeFriend from "@/app/api/friends/remove_friend";
import sendRequest from "@/app/api/friends/send_request";
import { UserContext } from "@/app/context/userContext";
import { JoinedDate } from "@/app/ui_components/Date";
import ProfilePicture from "@/app/ui_components/ProfilePicture";
import { useContext, useEffect, useState } from "react";

const UserInfo = ({ profile }: { profile: User }) => {
  const {
    _id,
    first_name,
    last_name,
    bio,
    birthday,
    friends,
    requestsReceived,
    createdAt,
  } = profile;

  const userContext = useContext(UserContext);

  const [isFriends, setIsFriends] = useState<boolean>();
  const [isPending, setIsPending] = useState<boolean>();
  const [isReceived, setIsReceived] = useState<boolean>();
  const [isSame, setIsSame] = useState<boolean>();

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
    if (userContext.user && profile) {
      //means everything loaded so I can check the social status 
      setIsFriends(friends.includes(userContext.user._id));
      setIsReceived(userContext.user?.requestsReceived?.includes(_id));
      setIsPending(requestsReceived.includes(userContext.user._id));
      setIsFriends(friends.includes(userContext.user!._id));
      setIsSame(_id === userContext.user._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext, profile]);

  return (
    <div>
      <div className="flex justify-between items-start">
        <ProfilePicture
          avatar={profile.avatar}
          name={profile.first_name}
          userID={profile._id}
        />
        <div className="flex gap-2 text-green">
          <p className="flex flex-col items-center">
            {profile.posts.length}{" "}
            <span className="text-grey text-xs">Posts</span>
          </p>
          <p className="flex flex-col items-center">
            {profile.workouts.length}{" "}
            <span className="text-grey text-xs">Workouts</span>
          </p>
          <p className="flex flex-col items-center">
            {profile.friends.length}{" "}
            <span className="text-grey text-xs">Friends</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-green text-xl font-ubuntu-500">
            {first_name} {last_name} <span onClick={()=> console.log('open edit pic')} className="cursor-pointer">pic</span>
          </p>
          <JoinedDate date={createdAt} />
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
          {!isSame && !isReceived && !isFriends && (
            <button className="social-button" onClick={handleAdd}>
              {isPending ? "Cancel" : "Add"}
            </button>
          )}
          {isSame && <button className="social-button">Edit profile</button>}
        </div>
      </div>
      <p> {bio}</p>
    </div>
  );
};

export default UserInfo;

import { User } from "@/app/__types__/types";
import cancelRequest from "@/app/api/friends/cancel_request";
import removeFriend from "@/app/api/friends/remove_friend";
import sendRequest from "@/app/api/friends/send_request";
import { UserContext } from "@/app/context/userContext";
import { JoinedDate } from "@/app/ui_components/Date";
import ProfilePicture from "@/app/ui_components/ProfilePicture";
import { useContext, useState } from "react";

const UserInfo = ({ profile }: { profile: User }) => {
  const { first_name, last_name } = profile;
  const userContext = useContext(UserContext);

  const [isProfile, setIsProfile] = useState<boolean>(
    userContext.user!._id === profile._id
  );

  const [isFriends, setIsFriends] = useState<boolean>(
    profile.friends.includes(userContext.user!._id)
  );

  const [isPending, setIsPending] = useState<boolean>(
    profile.requestsReceived.includes(userContext.user!._id)
  );

  const handleFriendship = (receiver: string, sender: string | undefined) => {
    if (isFriends) {
      removeFriend(receiver, sender).then(() => setIsFriends(false));
    }
    if (isPending) {
      cancelRequest(receiver, sender).then(() => setIsPending(false));
    } else {
      sendRequest(receiver, sender).then(() => setIsPending(true));
    }
  };

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
            {first_name} {last_name}
          </p>
          <JoinedDate date={profile.createdAt} />
        </div>
        {isProfile ? (
          <button onClick={() => console.log("edit profile")}>
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => handleFriendship(profile._id, userContext.user?._id)}
          >
            {isPending ? "Cancel" : "Add"}
          </button>
        )}
      </div>
      <p> {profile.bio}</p>
    </div>
  );
};

export default UserInfo;

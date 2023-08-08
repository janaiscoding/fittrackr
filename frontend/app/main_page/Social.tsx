import { useContext } from "react";
import acceptRequest from "../api/friends/accept_request";
import declineRequest from "../api/friends/decline_request";
import getUser from "../api/users/get_user";
import Title from "../components/Title";
import useCurrentUser from "../hooks/useCurrentUser";
import useFriendRequests from "../hooks/useFriendRequests";
import { UserContext } from "../context/userContext";
import NonFriendsUsers from "./NonFriendsUsers";

const Social = () => {
  // Fetching incoming friend requests
  const friendRequests = useFriendRequests();
  const currentUser = useCurrentUser();
  const userContext = useContext(UserContext);

  const handleAccept = (id: string) => {
    // senderID: friendReq user, receiverID: me, refresher handler
    acceptRequest(id, currentUser._id, handleSuccess);
  };
  const handleDecline = (id: string) => {
    declineRequest(id, currentUser._id, handleSuccess);
  };

  const handleSuccess = () => {
    //Refresh app context
    getUser(currentUser._id, userContext.setUser);
  };
  return (
    <div className="hidden md:flex flex-col w-1/2 gap-4">
      <Title title="Friend Requests" />

      {friendRequests.map((user, i) => (
        <div key={i}>
          <p>
            {user.first_name} {user.last_name}
          </p>
          <button onClick={() => handleAccept(user._id)}>Accept</button>
          <button onClick={() => handleDecline(user._id)}>Decline</button>
        </div>
      ))}
      <Title title="Users you may know..." />
      <NonFriendsUsers />
      <Title title="Your friends..." />
      <Title title="JanaIsCoding" />
    </div>
  );
};

export default Social;

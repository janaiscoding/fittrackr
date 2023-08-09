import Title from "../../components/Title";
import FriendRequests from "./FriendRequests";
import NonFriendsUsers from "./NonFriendsUsers";

const Social = () => {
  return (
    <div className="hidden md:flex flex-col w-1/2 gap-4">
      <Title title="Friend Requests" />
      <FriendRequests />
      <Title title="Community" />
      <NonFriendsUsers />
      <Title title="JanaIsCoding" />
    </div>
  );
};

export default Social;

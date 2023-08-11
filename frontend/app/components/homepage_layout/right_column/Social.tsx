import Title from "../../ui_elements/Title";
import FriendRequests from "../../socials_users/FriendRequests";
import NonFriendsUsers from "../../socials_users/NonFriendsUsers";

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

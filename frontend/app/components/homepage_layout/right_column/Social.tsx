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
      <a href="https://github.com/JanaIsCoding" className="text-xl font-ubuntu-500 self-start title my-1">
        JanaIsCoding
      </a>
    </div>
  );
};

export default Social;

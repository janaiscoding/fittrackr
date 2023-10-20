import Title from "../../ui_elements/Title";
import FriendRequests from "../../socials_users/FriendRequests";
import CommunityUsers from "../../socials_users/CommunityUsers";

const Social = () => {
  return (
    <div className="hidden md:flex flex-col w-1/2 gap-4">
      <div className="text-xl font-ubuntu-500 self-start text-accent mt-10">
        Friend Requests
      </div>
      <FriendRequests />
      <div className="text-xl font-ubuntu-500 self-start text-accent mt-10">
        Community
      </div>
      <CommunityUsers />
      <a
        href="https://github.com/JanaIsCoding"
        className="text-xl font-ubuntu-500 self-start title my-1"
      >
        JanaIsCoding
      </a>
    </div>
  );
};

export default Social;

import FriendRequests from "../../socials_users/FriendRequests";
import CommunityUsers from "../../socials_users/CommunityUsers";

const Social = () => {
  return (
    <div className="hidden md:flex flex-col w-1/2 gap-4 top-20 w-1/2 z-[49] sticky text-accent dark:text-gray-300">
      <div className="text-xl font-ubuntu-500 self-start">Friend Requests</div>
      <FriendRequests />
      <div className="text-xl font-ubuntu-500 self-start">Community</div>
      <CommunityUsers />
      <p className="text-center">
        Made with <span>🧡</span> by{" "}
        <a
          href="https://github.com/JanaIsCoding"
          className="text-orange-700 hover:text-accent underline"
          target="_blank"
        >
          JanaIsCoding
        </a>
      </p>
    </div>
  );
};

export default Social;

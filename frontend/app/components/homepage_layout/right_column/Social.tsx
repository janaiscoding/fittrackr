import Title from "../../ui_elements/Title";
import FriendRequests from "../../socials_users/FriendRequests";
import CommunityUsers from "../../socials_users/CommunityUsers";


const Social = () => {
  return (
    <div className="hidden md:flex flex-col w-1/2 gap-4 sticky top-20">
      <Title title="Friend Requests" />
      <FriendRequests />
      <Title title="Community" />
      <CommunityUsers />
      <p className="text-center text-black">
        Made with <span>💙</span> by{" "}
        <a
          href="https://github.com/JanaIsCoding"
          className="text-secondary hover:text-accent"
        >
          JanaIsCoding
        </a>
        .
      </p>
    </div>
  );
};

export default Social;

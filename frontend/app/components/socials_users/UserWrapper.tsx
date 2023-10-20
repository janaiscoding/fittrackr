import { User } from "@/app/utils/types";
import SocializeButtons from "./SocializeButtons";
import AvatarCommunity from "../images/AvatarCommunity";

const UserWrapper = ({ user }: { user: User }) => {
  return (
    <div
      key={user._id}
      className="bg-bgContainers text-secondary p-2 flex flex-col items-center justify-between gap-1 drop-shadow text-sm"
    >
      <div className="flex items-center gap-2">
        <AvatarCommunity avatar={user.avatar} userID={user._id} />
        <div className="flex flex-col">
          <a href={`/users/${user._id}`} className="hover:text-accent text-xl">
            {user.first_name} {user.last_name}
          </a>
          <div className="flex gap-1 font-ubuntu-500 text-xs">
            <p className="text-secondary">
              <span className="text-accent">{user.posts.length}</span> Posts
            </p>

            <p className="text-secondary">
              <span className="text-accent">{user.friends.length}</span> Friends
            </p>
          </div>
        </div>
      </div>
      <SocializeButtons user={user} />
    </div>
  );
};

export default UserWrapper;

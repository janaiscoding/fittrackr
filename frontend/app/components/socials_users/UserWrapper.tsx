import { User } from "@/app/utils/types";
import AvatarCommunity from "../images/AvatarCommunity";

const UserWrapper = ({ user }: { user: User }) => {
  return (
    <div
      key={user._id}
      className="bg-bgContainers dark:bg-gray-800 text-secondary dark:text-gray-300 p-2 items-center justify-between gap-1 drop-shadow text-sm"
    >
      <div className="flex items-center gap-2">
        <AvatarCommunity avatar={user.avatar} userID={user._id} />
        <div className="flex flex-col">
          <a
            href={`/users/${user._id}`}
            className="text-accent dark:text-white hover:text-accent dark:hover:text-accent text-xl"
          >
            {user.first_name} {user.last_name}
          </a>
          <div className="flex gap-1 font-ubuntu-500 text-xs text-secondary dark:text-gray-400">
            <p>
              <span className="text-accent">{user.posts.length}</span> Posts
            </p>

            <p>
              <span className="text-accent">{user.friends.length}</span> Friends
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWrapper;

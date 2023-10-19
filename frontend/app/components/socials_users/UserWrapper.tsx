import AvatarComment from "@/app/components/images/AvatarComment";
import { User } from "@/app/utils/types";

const UserWrapper = ({ user }: { user: User }) => {
  return (
    <div
      key={user._id}
      className="bg-bgContainers text-secondary p-2 flex flex-col items-center justify-between gap-1 drop-shadow text-sm"
    >
      <div className="flex items-center gap-1">
        <AvatarComment avatar={user.avatar} userID={user._id} />
        <a href={`/users/${user._id}`} className="hover:text-accent text-xl">
          {user.first_name} {user.last_name}
        </a>
      </div>
      <div className="flex gap-1 font-ubuntu-500 text-xs">
        <p className="text-secondary">
          <span className="text-accent">{user.posts.length}</span> Posts
        </p>

        <p className="text-secondary">
          <span className="text-accent">{user.friends.length}</span> Friends
        </p>
      </div>
    </div>
  );
};

export default UserWrapper;

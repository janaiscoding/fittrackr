import { User } from "@/app/__types__/types";
import AvatarComment from "@/app/components/images/AvatarComment";
import { workerData } from "worker_threads";

const UserWrapper = ({ user }: { user: User }) => {
  return (
    <div
      key={user._id}
      className="bg-blue text-white p-2 flex flex-col items-center justify-between gap-1 rounded text-sm"
    >
      <div className="flex items-center gap-1">
        <AvatarComment avatar={user.avatar} userID={user._id} />
        <a href={`/users/${user._id}`} className="hover:text-yellow text-xl">
          {user.first_name} {user.last_name}
        </a>
      </div>
      <div className="flex gap-1 font-ubuntu-500 text-xs">
        <p className="text-white2">
          <span className="text-white">{user.posts.length}</span> Posts
        </p>
        <p className="text-white2">
          <span className="text-white">{user.workouts.length}</span> Workouts
        </p>
        <p className="text-white2">
          <span className="text-white">{user.friends.length}</span> Friends
        </p>
      </div>
    </div>
  );
};

export default UserWrapper;

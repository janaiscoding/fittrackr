import { User } from "@/app/__types__/types";
import AvatarComment from "@/app/components/post_article/AvatarComment";

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
      <p className="text-white2">{user.bio}</p>
    </div>
  );
};

export default UserWrapper;

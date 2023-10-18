import SocializeButtons from "./SocializeButtons"
import AvatarComment from "../images/AvatarComment";
import { User } from "@/app/utils/types";


// This is the default container for interacting with different users on the platform
// Handling all social operations and states with the Custom Hook useSocializer
// TODO: ADD ARIA LABLES TO BUTTONS
const SocializeMember = ({ user }: { user: User }) => {

  return (
    <div
      key={user._id}
      className="bg-bgContainers text-white p-2 flex flex-col items-center justify-between gap-1 rounded text-sm"
    >
      <div className="flex items-center gap-1">
        <AvatarComment avatar={user.avatar} userID={user._id} />
        <a href={`/users/${user._id}`} className="hover:text-accent text-xl">
          {user.first_name} {user.last_name}
        </a>
      </div>
      <p className="text-white2">{user.bio}</p>
      <SocializeButtons user={user} />
    </div>
  );
};

export default SocializeMember;

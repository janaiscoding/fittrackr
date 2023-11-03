import { User } from "@/app/utils/types";
import SocializeButtons from "./SocializeButtons";
import AvatarCommunity from "../images/AvatarCommunity";

const FriedRequestWrapper = ({ user }: { user: User }) => {
  return (
    <div
      key={user._id}
      className="bg-bgContainers text-secondary items-center justify-center gap-1 drop-shadow text-sm"
    >
      <div className="flex items-center justify-center gap-2 p-2 bg-secondary/10">
        <AvatarCommunity avatar={user.avatar} userID={user._id} />
        <div className="flex flex-col">
          <a href={`/users/${user._id}`} className="hover:text-accent text-xl">
            {user.first_name} {user.last_name}
          </a>
        </div>
      </div>
     <div className="p-2">
     <SocializeButtons user={user} /> 
     </div>
    </div>
  );
};

export default FriedRequestWrapper;

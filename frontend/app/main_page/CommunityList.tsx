import { CommunityUser, User } from "../__types__/types";
import Loader from "../assets/Loader";
import AvatarComment from "../components/post_article/AvatarComment";
import useCommunityGetter from "../hooks/useCommunityGetter";
import useSocializer from "../hooks/useSocializer";

const CommunityList = () => {
  const { community, isLoading } = useCommunityGetter();

  return (
    <div className="flex flex-col gap-1">
      {isLoading && <Loader />}
      {community.map((user) => (
        <CommunityMember user={user} key={user._id} />
      ))}
    </div>
  );
};
export default CommunityList;
const CommunityMember = ({ user }: { user: CommunityUser }) => {
  const {
    isFriends,
    isPending,
    isReceived,
    handleAccept,
    handleAdd,
    handleDecline,
    handleRemove,
  } = useSocializer(user);

  console.log(user, "comm user?");
  return (
    <div
      key={user._id}
      className="bg-blue text-white p-2 flex items-center justify-between gap-1 rounded"
    >
      <div className="flex items-center gap-1">
        <AvatarComment avatar={user.avatar} userID={user._id} />
        <a href={`/users/${user._id}`} className="hover:text-yellow text-xl">
          {user.first_name} {user.last_name}
        </a>
      </div>

      {isPending && <button onClick={handleAdd}>Cancel</button>}
      {isFriends && <button onClick={handleRemove}>Remove</button>}
      {!isFriends && !isPending && <button onClick={handleAdd}>Add</button>}
    </div>
  );
};

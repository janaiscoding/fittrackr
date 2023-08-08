import { CommunityUser, User } from "../__types__/types";
import AvatarComment from "../components/post_article/AvatarComment";
import useSocializer from "../hooks/useSocializer";

const SocializeMember = ({ user }: { user: CommunityUser }) => {
  const {
    isFriends,
    isPending,
    isReceived,
    handleAccept,
    handleAdd,
    handleDecline,
    handleRemove,
  } = useSocializer(user);

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
      {isPending && (
        <button
          onClick={handleAdd}
          className="border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
        >
          Cancel
        </button>
      )}
      {isFriends && (
        <button
          onClick={handleRemove}
          className="border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
        >
          Remove
        </button>
      )}
      {!isFriends && !isReceived && !isPending && (
        <button
          onClick={handleAdd}
          className="border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
        >
          Add
        </button>
      )}
      {isReceived && (
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
          >
            {" "}
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default SocializeMember;

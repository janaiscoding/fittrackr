import { User } from "@/app/__types__/types";
import useSocializer from "@/app/hooks/useSocializer";

const SocializeButtons = ({ user }: { user: User }) => {
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
    <div>
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
export default SocializeButtons
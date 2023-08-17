import { User } from "@/app/utils/types";
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
    <div className="text-sm text-white">
      {isPending && (
        <button
          onClick={handleAdd}
          className="border border-softWhite hover:border-accent hover:bg-black border-solid px-3 rounded-md"
        >
          Cancel
        </button>
      )}
      {isFriends && (
        <button
          onClick={handleRemove}
          className="border border-softWhite hover:border-accent hover:bg-black border-solid py-1 px-3 rounded-md"
        >
          Remove
        </button>
      )}
      {!isFriends && !isReceived && !isPending && (
        <button
          onClick={handleAdd}
          className="border border-softWhite hover:border-accent hover:bg-black border-solid py-1 px-3 rounded-md"
        >
          Add friend
        </button>
      )}
      {isReceived && (
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="border border-softWhite hover:border-accent hover:bg-black border-solid py-1 px-3 rounded-md"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="border border-softWhite hover:border-accent hover:bg-black border-solid py-1 px-3 rounded-md"
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
import { User } from "@/app/utils/types";
import useSocializer from "@/app/hooks/useSocializer";

const SocializeButtons = ({ user }: { user: User }) => {
  const {
    isFriends,
    isPending,
    isReceived,
    handleAccept,
    handleAdd,
    handleCancel,
    handleDecline,
    handleRemove,
  } = useSocializer(user);

  return (
    <div className="text-sm text-white pb-2">
      {isPending && (
        <button
          onClick={handleCancel}
          className="md:text-xl text-white bg-red-700 hover:bg-red-800 px-2 border border-slate-700/10"
        >
          Cancel
        </button>
      )}

      {isFriends && (
        <button
          onClick={handleRemove}
          className="md:text-xl text-white bg-red-700 hover:bg-red-800 px-2 border border-slate-700/10"
        >
          Remove
        </button>
      )}
      {!isFriends && !isReceived && !isPending && (
        <button
          onClick={handleAdd}
          className="md:text-xl text-white bg-green-900 hover:bg-green-800 px-2 border border-slate-700/10"
        >
          Add friend
        </button>
      )}
      {isReceived && (
        <div className="flex justify-evenly gap-2">
          <button
            onClick={handleAccept}
            className="md:text-xl text-pureWhite bg-green-900 hover:bg-green-800 px-2 border border-slate-700/10"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="md:text-xl text-white bg-red-700 hover:bg-red-800 px-2 border border-slate-700/10"
          >
            {" "}
            Decline
          </button>
        </div>
      )}
    </div>
  );
};
export default SocializeButtons;

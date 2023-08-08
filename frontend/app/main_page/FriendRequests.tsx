import useFriendRequests from "../hooks/useFriendRequests";
import SocializeMember from "./SocializeMember";

const FriendRequests = () => {
  const friendRequests = useFriendRequests();

  return (
    <div>
      {friendRequests.map((req) => (
        <SocializeMember key={req._id} user={req} />
      ))}
    </div>
  );
};

export default FriendRequests
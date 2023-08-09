import Loader from "../assets/Loader";
import useCommunityGetter from "../hooks/useCommunityGetter";
import useCurrentUser from "../hooks/useCurrentUser";
import SocializeMember from "./SocializeMember";

const NonFriendsUsers = () => {
  const { community, isLoading } = useCommunityGetter();
  const { currentUser } = useCurrentUser();
  return (
    <div className="flex flex-col gap-1">
      {isLoading && <Loader />}
      {community
        .filter(
          (c) =>
            c.friends.includes(currentUser._id) === false &&
            c.requestsSent.includes(currentUser._id) === false
        )
        .map((user) => (
          <SocializeMember user={user} key={user._id} />
        ))}
    </div>
  );
};
export default NonFriendsUsers;

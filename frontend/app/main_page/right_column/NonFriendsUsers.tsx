import Loader from "@/app/assets/Loader";
import useCommunityGetter from "@/app/hooks/useCommunityGetter";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import SocializeMember from "./SocializeMember";
import UserWrapper from "./UserWrapper";

// mby dont add social buttons here
const NonFriendsUsers = () => {
  const { community, isLoading } = useCommunityGetter();
  // const { currentUser } = useCurrentUser();
  // important to use like this here so that filtering happens instantly and doesnt wait for user context to not be null
  // or could show all users on the platform
  return (
    <div className="flex flex-col gap-1">
      {isLoading && <Loader />}
      {community
        // .filter(
        //   (c) =>
        //     c.friends.includes(currentUser._id) === false &&
        //     c.requestsSent.includes(currentUser._id) === false
        // )
        .map((user) => (
          <UserWrapper user={user} key={user._id} />
        ))}
    </div>
  );
};
export default NonFriendsUsers;

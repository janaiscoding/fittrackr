import useFriendsList from "@/app/hooks/useFriendsList";
import Loader from "@/app/utils/assets/Loader";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import UserWrapperCommunityPage from "./UserWrapperWithButtons";
// make it on its own page - Homepage for currentUser atm
const FriendsList = () => {
  const {currentUser} = useCurrentUser()
  const { friends, isLoading } = useFriendsList(currentUser._id);

  return (
    <div className="flex flex-col gap-1">
      {isLoading && <Loader />}
      {friends.map((user) => (
        <UserWrapperCommunityPage user={user} key={user._id} />
      ))}
    </div>
  );
};

export default FriendsList;

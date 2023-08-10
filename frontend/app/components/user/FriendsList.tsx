import useFriendsList from "@/app/hooks/useFriendsList";
import Loader from "@/app/assets/Loader";
import UserWrapper from "./UserWrapper";
import useCurrentUser from "@/app/hooks/useCurrentUser";
// make it on its own page - Homepage for currentUser atm
const FriendsList = () => {
  const {currentUser} = useCurrentUser()
  const { friends, isLoading } = useFriendsList(currentUser._id);

  return (
    <div className="flex flex-col gap-1">
      {isLoading && <Loader />}
      {friends.map((user) => (
        <UserWrapper user={user} key={user._id} />
      ))}
    </div>
  );
};

export default FriendsList;

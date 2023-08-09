import useFriendsList from "@/app/hooks/useFriendsList";
import Loader from "@/app/assets/Loader";
import UserWrapper from "./UserWrapper";
// make it on its own page
const FriendsList = () => {
  const { friends, isLoading } = useFriendsList();
  console.log(friends, 'in wrapper')
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

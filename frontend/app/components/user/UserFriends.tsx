import Loader from "@/app/assets/Loader";
import useFriendsList from "@/app/hooks/useFriendsList";
import UserWrapper from "./UserWrapper";

const UserFriends = ({ userID }: { userID: string }) => {
  const { friends, isLoading } = useFriendsList(userID);

  return (
    <div className="flex flex-col gap-1 mt-2">
      {isLoading && <Loader />}
      {friends.map((user) => (
        <UserWrapper user={user} key={user._id} />
      ))}
    </div>
  );
};

export default UserFriends;

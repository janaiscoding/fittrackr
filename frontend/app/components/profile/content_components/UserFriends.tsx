import Loader from "@/app/utils/assets/Loader";
import useFriendsList from "@/app/hooks/useFriendsList";
import UserWrapper from "../../socials_users/UserWrapper";

const UserFriends = ({ userID }: { userID: string }) => {
  const { friends, isLoading } = useFriendsList(userID);

  return (
    <div className="md:grid md:grid-cols-3 md:gap-4 flex flex-col gap-1 mt-2">
      {isLoading && <Loader />}
      {!isLoading && friends.length === 0 && (
        <p className="w-full self-center text-secondary bg-bgContainers p-2 rounded">
          This user doesn&apos;t have any friends yet.
        </p>
      )}
      {friends.map((user) => (
        <UserWrapper user={user} key={user._id} />
      ))}
    </div>
  );
};

export default UserFriends;

import Loader from "@/app/utils/assets/Loader";
import useFriendsList from "@/app/hooks/useFriendsList";
import UserWrapper from "../../socials_users/UserWrapper";
import UserWrapperCommunityPage from "../../socials_users/UserWrapperCommunityPage";

const UserFriends = ({
  userID,
  isSame,
}: {
  userID: string;
  isSame: boolean | undefined;
}) => {
  const { friends, isLoading } = useFriendsList(userID);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && friends.length === 0 && (
        <p className="w-full self-center text-secondary bg-bgContainers dark:bg-gray-800 dark:text-gray-200 p-2 shadow-md">
          {isSame ? `You don't` : `This user doesn't`} have any friends yet.{" "}
          {isSame && (
            <span>
              {" "}
              Go add some{" "}
              <a
                href="/users"
                className="text-accent dark:text-sky-300 hover:text-secondary underline"
              >
                new friends
              </a>{" "}
              now!
            </span>
          )}
        </p>
      )}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-1 mt-2">
        {friends.map((user) => (
          <UserWrapperCommunityPage user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};

export default UserFriends;

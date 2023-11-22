import Loader from "@/app/utils/assets/Loader";
import useFriendsList from "@/app/hooks/useFriendsList";
import UserWrapperCommunityPage from "../../socials_users/UserWrapperWithButtons";
import { useEffect, useState } from "react";
import { User } from "@/app/utils/types";
import getFriends from "@/app/utils/api/users/get_friends";

const UserFriends = ({
  userID,
  isSame,
}: {
  userID: string;
  isSame: boolean | undefined;
}) => {
  const [f, setFriends] = useState<User[]>([] as User[]);
  useEffect(() => {
    getFriends(userID, (friends: User[]) => {
      setFriends(friends);
    });
  }, [userID]);
  return (
    <div>
      {f && f.length === 0 && (
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
        {f &&
          f.map((user) => (
            <UserWrapperCommunityPage user={user} key={user._id} />
          ))}
      </div>
    </div>
  );
};

export default UserFriends;

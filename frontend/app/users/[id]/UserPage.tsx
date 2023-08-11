import { User } from "@/app/utils/__types__/types";
import UserFriends from "@/app/components/user/UserFriends";
import UserInfo from "@/app/components/user/UserInfo";
import UserPosts from "@/app/components/user/UserPosts";
import UserTabToggle from "@/app/components/user/UserTabToggle";
import { ViewContext } from "@/app/context/viewContext";
import { useContext } from "react";

const UserPage = ({
  profile,
  isSame,
}: {
  profile: User;
  isSame: boolean | undefined;
}) => {
  const viewContext = useContext(ViewContext);
  
  return (
    <>
      <div className="flex flex-col font-ubuntu w-full">
        <UserInfo profile={profile} isSame={isSame} />
      </div>
      <div>
        <UserTabToggle />
        {viewContext.current === "feed" && (
          <UserPosts userID={profile._id} />
        )}

        {isSame && viewContext.current === "workouts" && (
          <p className="w-full self-center text-error bg-blue p-2 rounded mt-2">
            Post a new Workout field.
          </p>
        )}

        {viewContext.current === "workouts" && (
          <p className="w-full self-center text-error bg-blue p-2 rounded mt-2">
            Work in progress
          </p>
        )}

        {viewContext.current === "friends" && (
          <UserFriends userID={profile._id} />
        )}
      </div>
    </>
  );
};

export default UserPage;

import { User } from "@/app/utils/__types__/types";
import { ViewContext } from "@/app/context/viewContext";

import { useContext } from "react";
import TopInfo from "./TopInfo";
import ViewTabs from "./ViewTabs";
import PostsLayout from "./PostsLayout";
import FriendsOf from "./FriendsOf";

const ProfileLayout = ({
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
        <TopInfo profile={profile} isSame={isSame} />
      </div>
      <div>
        <ViewTabs />
        {viewContext.current === "feed" && <PostsLayout userID={profile._id} />}

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
          <FriendsOf userID={profile._id} />
        )}
      </div>
    </>
  );
};

export default ProfileLayout;

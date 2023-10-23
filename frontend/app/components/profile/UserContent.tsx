import { ViewContext } from "@/app/context/viewContext";
import { User } from "@/app/utils/types";
import { useContext } from "react";
import UserPosts from "./content_components/UserPosts";
import UserFriends from "./content_components/UserFriends";

const UserContent = ({
  isSame,
  profile,
}: {
  isSame: boolean | undefined;
  profile: User;
}) => {
  const viewContext = useContext(ViewContext);
  return (
    <div className="md:w-3/4 m-auto py-2">
      {viewContext.current === "feed" && (
        <UserPosts userID={profile._id} isSame={isSame} />
      )}
      {viewContext.current === "friends" && <UserFriends userID={profile._id} isSame={isSame} />}
    </div>
  );
};

export default UserContent;

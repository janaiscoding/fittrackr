import { ViewContext } from "@/app/context/viewContext";
import { User } from "@/app/utils/types";
import { useContext } from "react";
import UserTabToggle from "../toggles/UserTabToggle";
import PostsOf from "./content_components/PostsOf";
import FriendsOf from "./content_components/FriendsOf";

const ContentOf = ({ profile }: { profile: User }) => {
  const viewContext = useContext(ViewContext);
  return (
    <div>
      {viewContext.current === "feed" && <PostsOf userID={profile._id} />}
      {viewContext.current === "workouts" && (
        <p className="w-full self-center text-error bg-bgContainers p-2 rounded mt-2">
          Work in progress
        </p>
      )}
      {viewContext.current === "friends" && (
        <FriendsOf userID={profile._id} />
      )}
    </div>
  );
};

export default ContentOf
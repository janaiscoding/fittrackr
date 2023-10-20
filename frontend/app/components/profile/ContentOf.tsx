import { ViewContext } from "@/app/context/viewContext";
import { User } from "@/app/utils/types";
import { useContext } from "react";
import PostsOf from "./content_components/PostsOf";
import FriendsOf from "./content_components/FriendsOf";

const ContentOf = ({ isSame, profile }: { isSame:boolean|undefined, profile: User }) => {
  const viewContext = useContext(ViewContext);
  return (
    <div>
      {viewContext.current === "feed" && <PostsOf userID={profile._id} isSame={isSame} />}
      {viewContext.current === "friends" && (
        <FriendsOf userID={profile._id} />
      )}
    </div>
  );
};

export default ContentOf
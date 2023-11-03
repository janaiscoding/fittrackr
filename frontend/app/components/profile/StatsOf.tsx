import { User } from "@/app/utils/types";
import { UserContext } from "@/app/context/userContext";
import { ViewContext } from "@/app/context/viewContext";
import { useContext, useEffect, useState } from "react";

const StatsOf = ({ profile }: { profile: User }) => {
  const [pLength, setPLength] = useState(profile.posts.length);
  const [fLength, setFLength] = useState(profile.friends.length);

  const userContext = useContext(UserContext);
  const viewContext = useContext(ViewContext);

  useEffect(() => {
    if (userContext.user?._id === profile._id) {
      setPLength(userContext.user.posts.length);
      setFLength(userContext.user.friends.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user]);

  return (
    <div className="flex text-sm font-ubuntu-500 text-softWhite justify-between">
      <p
        className="pr-2 text-softWhite hover:cursor-pointer hover:text-accent"
        onClick={() => viewContext.setCurrent("feed")}
      >
        {pLength} Posts
      </p>
      <p
        className="pr-2 text-softWhite hover:cursor-pointer hover:text-accent"
        onClick={() => viewContext.setCurrent("friends")}
      >
        {fLength} Friends
      </p>
    </div>
  );
};

export default StatsOf;

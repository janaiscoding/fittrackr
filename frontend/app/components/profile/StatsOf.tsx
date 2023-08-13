import { User } from "@/app/utils/__types__/types";
import { UserContext } from "@/app/context/userContext";
import { ViewContext } from "@/app/context/viewContext";
import { useContext, useEffect, useState } from "react";

const StatsOf = ({ profile }: { profile: User }) => {
  const [pLength, setPLength] = useState(profile.posts.length);
  const [wLength, setWLength] = useState(profile.workouts.length);
  const [fLength, setFLength] = useState(profile.friends.length);

  const userContext = useContext(UserContext);
  const viewContext = useContext(ViewContext);

  useEffect(() => {
    if (userContext.user?._id === profile._id) {
      setPLength(userContext.user.posts.length);
      setWLength(userContext.user.workouts.length);
      setFLength(userContext.user.friends.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user]);

  return (
    <div className="flex text-sm font-ubuntu-500 text-white2 justify-between m-2">
      <p
        className="flex flex-col items-center justify-center px-2 hover:cursor-pointer"
        onClick={() => viewContext.setCurrent("feed")}
      >
        <span className="text-secondary text-lg hover:text-yellow">
          {pLength}
        </span>
        Posts
      </p>
      <div className="border-r border-white2/30"></div>
      <p
        className="flex flex-col items-center justify-center px-2 hover:cursor-pointer"
        onClick={() => viewContext.setCurrent("workouts")}
      >
        <span className="text-secondary text-lg hover:text-yellow">
          {wLength}
        </span>
        Workouts
      </p>
      <div className="border-r border-white2/30"></div>
      <p
        className="flex flex-col items-center justify-center px-2 hover:cursor-pointer"
        onClick={() => viewContext.setCurrent("friends")}
      >
        <span className="text-secondary text-lg hover:text-yellow">
          {fLength}
        </span>
        Friends
      </p>
    </div>
  );
};

export default StatsOf;

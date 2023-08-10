import { Post, User, Workout } from "@/app/__types__/types";
import { ViewContext } from "@/app/context/viewContext";
import { useContext } from "react";

type StatsProps = {
  posts: Post[];
  workouts: Workout[];
  friends: string[];
};
const Stats = ({ profile }: { profile: User }) => {
  const viewContext = useContext(ViewContext);
  return (
    <div className="flex text-sm font-ubuntu-500 text-white2 justify-between m-2">
      <p
        className="flex flex-col items-center justify-center px-2 hover:cursor-pointer"
        onClick={() => viewContext.setCurrent("feed")}
      >
        <span className="text-yellow2 text-lg hover:text-yellow">
          {profile.posts.length}
        </span>
        Posts
      </p>
      <div className="border-r border-white2/30"></div>
      <p
        className="flex flex-col items-center justify-center px-2 hover:cursor-pointer"
        onClick={() => viewContext.setCurrent("workouts")}
      >
        <span className="text-yellow2 text-lg hover:text-yellow">
          {profile.workouts.length}
        </span>
        Workouts
      </p>
      <div className="border-r border-white2/30"></div>
      <p className="flex flex-col items-center justify-center px-2 hover:cursor-pointer">
        <span className="text-yellow2 text-lg hover:text-yellow">
          {profile.friends.length}
        </span>
        Friends
      </p>
    </div>
  );
};

export default Stats;

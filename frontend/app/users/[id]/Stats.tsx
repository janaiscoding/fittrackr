import { ProfilePost, Workout } from "../../__types__/types";

const Stats = ({
  posts,
  workouts,
  friends,
}: {
  posts: ProfilePost[];
  workouts: Workout[];
  friends: string[];
}) => {
  return (
    <div className="flex gap-2 text-green">
      <p className="flex flex-col items-center">
        {posts.length} <span className="text-grey text-xs">Posts</span>
      </p>
      <p className="flex flex-col items-center">
        {workouts.length} <span className="text-grey text-xs">Workouts</span>
      </p>
      <p className="flex flex-col items-center">
        {friends.length} <span className="text-grey text-xs">Friends</span>
      </p>
    </div>
  );
};

export default Stats;

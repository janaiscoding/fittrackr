import { CommunityUser, ShortUser } from "../__types__/types";

const UserComponent = ({ user }: { user: CommunityUser }) => {
  const { _id, first_name, last_name, avatar, posts, workouts, friends } = user;

  return (
    <div className="border-b border-white">
      <a href={`/users/${_id}`}>
        {first_name} {last_name}
      </a>
      <p>{posts.length} posts</p>
      <p>{workouts.length} workouts</p>
      <p>{friends.length} friends</p>
    </div>
  );
};

export default UserComponent;

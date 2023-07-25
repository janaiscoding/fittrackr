import { ProfilePost, ShortUser, User } from "@/app/__types__/types";
import Date from "@/app/ui_components/post_components/Date";

const ProfilePost = ({ post, user }: { post: ProfilePost; user: User }) => {
  console.log(post);
  return (
    <div>
      <a className="text-green" href={`/users/${user._id}`}>
        {user.first_name} {user.last_name}
      </a>
      <Date date={post.createdAt} />
      <p>{post.text}</p>
    </div>
  );
};

export default ProfilePost;

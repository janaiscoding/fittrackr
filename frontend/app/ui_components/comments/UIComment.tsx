import { Comment } from "@/app/__types__/types";
import AvatarComment from "./AvatarComment";

const UIComment = ({ comment }: { comment: Comment }) => {
  return (
    <div>
      <div className="flex items-center">
        <AvatarComment avatar={comment.user.avatar} userID={comment.user._id} />
        <a className="text-green" href={`/users/${comment.user._id}`}>
          {comment.user.first_name} {comment.user.last_name}
        </a>
      </div>
      <p>{comment.comment}</p>
    </div>
  );
};

export default UIComment;

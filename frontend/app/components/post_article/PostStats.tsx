import { Comment, Post } from "@/app/__types__/types";
import CommentSVG from "@/app/assets/svgs/CommentSVG";
import Like from "@/app/assets/svgs/Like";
import LikeFilled from "@/app/assets/svgs/LikeFilled";

const PostStats = ({
  post,
  comments,
  isLiked,
  handleLike,
}: {
  post: Post;
  isLiked: boolean | undefined;
  handleLike: () => void;
  comments: Comment[];
}) => {
  const { _id, likes } = post;
  return (
    <div className="flex items-start mt-2 gap-2">
      <div>
        <div
          onClick={handleLike}
          className="hover:cursor-pointer"
          aria-label="Toggle like button"
        >
          {isLiked ? <LikeFilled /> : <Like />}
        </div>
        <div className="text-white2 font-ubuntu-500 text-sm">
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </div>
      </div>
      <div aria-label="Comment icon and comment count">
        <CommentSVG />
        <div className="text-white2 font-ubuntu-500 text-sm">
          <span id={`comments-${_id}`}>{comments.length}</span>{" "}
          {comments.length === 1 ? "comment" : "comments"}
        </div>
      </div>
    </div>
  );
};

export default PostStats;

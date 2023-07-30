import { SetStateAction, SyntheticEvent, useState } from "react";
import sendComment from "../../api/send_comment";
import SendSVG from "../../assets/svgs/SendSVG";
type CommentFormTypes = {
  postID: string;
  userID: string | undefined;
  refr: boolean;
  setRefr: React.Dispatch<SetStateAction<boolean>>;
};
const CommentForm = ({ postID, userID, refr, setRefr }: CommentFormTypes) => {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    sendComment(postID, comment, userID, setCommentError).then(() => {
      setRefr(!refr);
      setComment(" ");
    });
  };

  return (
    <div>
      <form className="flex items-center" onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Send a comment.."
        />
        <button type="submit">
          <SendSVG />
        </button>
      </form>
      {commentError}
    </div>
  );
};

export default CommentForm;

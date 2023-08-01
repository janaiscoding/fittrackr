import { SetStateAction, SyntheticEvent, useContext, useState } from "react";
import sendComment from "../../api/posts/send_comment";
import SendSVG from "../../assets/svgs/SendSVG";
import { UserContext } from "@/app/context/userContext";
type CommentFormTypes = {
  postID: string;
  refr: boolean;
  setRefr: React.Dispatch<SetStateAction<boolean>>;
};
const CommentForm = ({ postID, refr, setRefr }: CommentFormTypes) => {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const userContext = useContext(UserContext);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    sendComment(postID, comment, userContext.user?._id, setCommentError).then(
      () => {
        console.log("swapping refr")
        setRefr(!refr);
        setComment("");
      }
    );
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

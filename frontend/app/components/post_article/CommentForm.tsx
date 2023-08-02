import sendComment from "@/app/api/posts/send_comment";
import SendSVG from "@/app/assets/svgs/SendSVG";
import { UserContext } from "@/app/context/userContext";
import { SetStateAction, SyntheticEvent, useContext, useState } from "react";

type CommentFormTypes = {
    postID: string;
    refresher: boolean | null;
    setRefresher: React.Dispatch<SetStateAction<boolean | null>>;
  };
  
  const CommentForm = ({ postID, refresher, setRefresher }: CommentFormTypes) => {
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");
    const userContext = useContext(UserContext);
  
    const handleSubmit = (e: SyntheticEvent) => {
      e.preventDefault();
      sendComment(
        postID,
        comment,
        userContext.user?._id,
        handleSuccessPOST,
        handleErrorPOST
      );
    };
  
    const handleErrorPOST = (msg: string) => {
      setCommentError(msg);
      console.log(commentError, "display error popup");
    };
  
    const handleSuccessPOST = () => {
      setRefresher(!refresher);
      setComment("");
      //success popup?
    };
    return (
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="text-ubuntu flex items-center justify-between px-4"
      >
        <input
          className="text-white w-full bg-blue outline-none pt-2 pr-12"
          placeholder={"Add a comment..."}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="left-[90%] md:left-[94%]">
          <SendSVG />
        </button>
      </form>
    );
  };
  
export default CommentForm;  
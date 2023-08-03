import getPosts from "@/app/api/posts/get_posts";
import sendComment from "@/app/api/posts/send_comment";
import SendSVG from "@/app/assets/svgs/SendSVG";
import { PostsContext } from "@/app/context/postsContext";
import { UserContext } from "@/app/context/userContext";
import { SyntheticEvent, useContext, useState } from "react";

const CommentForm = ({ postID }: { postID: string }) => {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);

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
    console.log("new comment was sent- re-render with context");
    getPosts(postsContext.setPosts);
    setComment("");
    //success popup?
  };
  return (
    <>
        <form
      onSubmit={(e) => handleSubmit(e)}
      className="text-ubuntu flex items-center justify-between px-4"
    >
      <input
        className="text-white w-full bg-blue outline-none pt-2 pr-12"
        placeholder={"Add a comment..."}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value)
          if(e.target.value.length > 1) {
            setCommentError("")
          }
        }}
      />
      <button type="submit" className="left-[90%] md:left-[94%]">
        <SendSVG />
      </button>
    </form>
      <div className="px-4">
        <p className="text-error">{commentError}</p>
      </div>
      </>
  );
};

export default CommentForm;

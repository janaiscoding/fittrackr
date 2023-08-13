import getPosts from "@/app/utils/api/posts/get_posts";
import sendComment from "@/app/utils/api/posts/send_comment";
import SendSVG from "@/app/utils/assets/svgs/SendSVG";
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
    if (comment.length === 0) {
      setCommentError("Comment is too short");
    } else {
      sendComment(
        postID,
        comment,
        userContext.user?._id,
        handleSuccessPOST,
        handleErrorPOST
      );
    }
  };

  const handleErrorPOST = (msg: string) => {
    setCommentError(msg);
  };

  const handleSuccessPOST = () => {
    getPosts(postsContext.setPosts);
    setComment("");
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="text-ubuntu flex items-center justify-between px-4"
      >
        <input
          className="text-white w-full bg-transparent outline-none pt-2 pr-12"
          placeholder={"Add a comment..."}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            if (e.target.value.length > 1) {
              setCommentError("");
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
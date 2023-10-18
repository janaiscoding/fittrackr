/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CommentContainer from "./CommentContainer";
import CommentForm from "./CommentForm";
import { Comment } from "@/app/utils/types";

type CommentsProps = {
  postID: string;
  postComments: Comment[];
};

const Comments = ({ postID, postComments }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([] as Comment[]);

  useEffect(() => {
    setComments(postComments); // state re-setter
  }, [postComments]);

  return (
    <div>
      {comments.length > 0 && (
        <div className="px-4 text-white2 text-ubuntu border-solid border-b border-grey py-2">
          {comments.map((c) => (
            <CommentContainer key={c._id} postID={postID} comm={c} />
          ))}
        </div>
      )}
      <CommentForm postID={postID} />
    </div>
  );
};

export default Comments;

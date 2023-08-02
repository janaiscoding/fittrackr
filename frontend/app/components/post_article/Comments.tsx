/* eslint-disable react-hooks/exhaustive-deps */
import { Comment, Post } from "@/app/__types__/types";
import getPostComments from "@/app/api/posts/get_post_comments";
import { SetStateAction, useEffect, useState } from "react";
import CommentContainer from "./CommentContainer";
import CommentForm from "./CommentForm";

const Comments = ({
  post,
  comments,
  setComments,
}: {
  post: Post;
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
  comments: Comment[];
}) => {
  const [refresher, setRefresher] = useState<boolean | null>(null);

  useEffect(() => {
    if (refresher !== null) {
      // Update specific post comments everytime the comment POST is successful
      getPostComments(post._id, setComments);
    }
  }, [refresher]);
  return (
    <div>
      {comments.length > 0 && (
        <div className="px-4 text-white2 text-ubuntu border-solid border-b border-grey py-2">
          {comments.map((c) => (
            <CommentContainer
              key={c._id}
              postID={post._id}
              comm={c}
              refresher={refresher}
              setRefresher={setRefresher}
            />
          ))}
        </div>
      )}
      <CommentForm
        postID={post._id}
        refresher={refresher}
        setRefresher={setRefresher}
      />
    </div>
  );
};

export default Comments;

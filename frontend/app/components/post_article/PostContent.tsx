import { Comment, Post } from "@/app/__types__/types";
import { getJwtToken } from "@/app/api/auth/auth_handler";
import { UserContext } from "@/app/context/userContext";
import { SetStateAction, useContext } from "react";
import PostImage from "./PostImage";
import PostStats from "./PostStats";

const PostContent = ({
  post,
  comments,
  isLiked,
  setIsLiked,
}: {
  post: Post;
  comments: Comment[];
  isLiked: boolean | undefined;
  setIsLiked: React.Dispatch<SetStateAction<boolean | undefined>>;
}) => {
  const { text, user, image } = post;
  const userContext = useContext(UserContext);

  const handleLike = () => {
    fetch(`https://fiturself.fly.dev/posts/${post._id}/like`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      body: JSON.stringify({ userID: userContext.user?._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Like was a success, update our current post data, and update the liked status
        post.likes = data.likes;
        setIsLiked(!isLiked);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <p className="font-ubuntu px-4 mb-2 text-white break-all max-w-sm">
        {text}
      </p>
      <PostImage user={user} image={image} />
     <div className="px-4 border-solid border-b border-grey pb-2">
        <PostStats
          post={post}
          comments={comments}
          isLiked={isLiked}
          handleLike={handleLike}
        />
      </div>
    </div>
  );
};

export default PostContent;

import { Post } from "@/app/utils/types/types";
import Date from "./Date";
import ProfilePicture from "../ProfilePicture";
import { SyntheticEvent, useContext, useState } from "react";
import { UserContext } from "@/app/page";
import { getJwtToken } from "@/app/utils/auth_handler";
import CommentSVG from "../svgs/Comments";
import SendSVG from "../svgs/SendSVG";
import CommComponent from "./Comment";

const PostComponent = ({ post }: { post: Post }) => {
  const [likes, setLikes] = useState<number>(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState<string>("");
  const [isShown, setShown] = useState(false);
  const { avatar, name, userID } = useContext(UserContext);
  const likePostAPI = `https://fiturself.fly.dev/posts/${post._id}/${userID}/like`;
  const commentAPI = `https://fiturself.fly.dev/posts/${post._id}/${userID}/`;

  const handleLike = async () => {
    await fetch(likePostAPI, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getJwtToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLikes(data.likes);
      });
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    console.log("sent comment");
    e.preventDefault();
    console.log(comment);
    await fetch(commentAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getJwtToken()}`,
      },
      body: JSON.stringify({ text: comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        //update latest
        setComments([data.comments.comments[0], ...comments]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <article className="bg-black2 post p-4 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-2">
          <ProfilePicture
            avatar={post.user.avatar}
            name={post.user.first_name}
            userID={userID}
          />
          <div className="flex flex-col">
            <a
              href={`/users/${post.user._id}`}
              className="text-green font-semibold tracking-wider text-xl align-text-bottom align-baseline self-end"
            >
              {post.user.first_name} {post.user.last_name}
            </a>
            <Date date={post.createdAt} />
          </div>
        </div>
      </div>

      <div className="py-2">
        <h1> {post.text}</h1>
        {/* image here and post content */}
      </div>
      <div className="flex items-center justify-between text-green">
        <div className="flex cursor-pointer" onClick={handleLike}>
          🔥
          {likes}
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShown(!isShown)}
        >
          <CommentSVG />
          {post.comments.length}
        </div>
      </div>
      {isShown && (
        <div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex items-center gap-2 py-2"
          >
            <input
              className="w-full text-sm text-ubuntu-300 pr-10"
              type="text"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit" className="absolute left-[80%]">
              <SendSVG />
            </button>
          </form>

          {comments.length > 0 &&
            comments.map((c: any) => (
              <CommComponent
                key={c._id}
                avatar={c.user.avatar}
                commentatorID={c.user._id}
                postID={post._id}
                commID={c._id}
                first={c.user.first_name}
                last={c.user.last_name}
                date={c.createdAt}
                text={c.text}
                likes={c.likes.length}
              />
            ))}
        </div>
      )}
    </article>
  );
};

export default PostComponent;

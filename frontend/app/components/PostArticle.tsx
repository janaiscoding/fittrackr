/* eslint-disable react-hooks/exhaustive-deps */
import {
  SetStateAction,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Avatar, Comment, Post, ShortUser } from "../__types__/types";
import getPostComments from "../api/posts/get_post_comments";
import AvatarComment from "./comments/AvatarComment";
import { Date } from "./Date";
import Image from "next/image";
import { UserContext } from "../context/userContext";
import { getJwtToken } from "../api/auth/auth_handler";
import Like from "../assets/svgs/Like";
import LikeFilled from "../assets/svgs/LikeFilled";
import SendSVG from "../assets/svgs/SendSVG";
import sendComment from "../api/posts/send_comment";

const PostArticle = ({ post }: { post: Post }) => {
  const [refr, setRefr] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments); // Set initial comments

  useEffect(() => {
    getPostComments(post._id, setComments);
    // Update everytime the comment form is successful
  }, [refr]);
  return (
    <article id={post._id}>
      <Author post={post} />
      <PostContent post={post} />
      <Comments postID={post._id} comments={comments} />
      <CommentForm postID={post._id} refr={refr} setRefr={setRefr} />
    </article>
  );
};
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
        console.log("swapping refr");
        setRefr(!refr);
        setComment("");
      }
    );
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="text-ubuntu border-solid border-b border-grey flex items-center relative"
    >
      <input
        className="text-white w-full bg-black outline-none py-2 pl-4 pr-12"
        placeholder={"Add a comment..."}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" className="absolute left-[94%]">
        <SendSVG />
      </button>
    </form>
  );
};
const Comments = ({
  postID,
  comments,
}: {
  postID: string;
  comments: Comment[];
}) => {
  const userContext = useContext(UserContext);
  const [isLiked, setIsLiked] = useState<boolean>();

  const handleLike = () => {
    fetch(`https://fiturself.fly.dev/posts/${postID}/${comments[0]._id}/like`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      body: JSON.stringify({ userID: userContext.user?._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        comments[0].likes = data.likes;
        setIsLiked(!isLiked);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    comments[0] &&
      userContext.user &&
      setIsLiked(comments[0].likes.includes(userContext.user!._id));
  }, [userContext.user]);

  return (
    <div className="px-4 text-white2 text-ubuntu">
      <p className="hover:cursor-pointer">
        View all {comments.length} comments
      </p>
      {
        //Display just the latest comment
        comments[0] && (
          <div className="flex justify-between">
            <div className="flex gap-1">
              <a
                href={`/users/${comments[0].user._id}`}
                className="text-white hover:text-yellow"
              >
                {comments[0].user.first_name} {comments[0].user.last_name}
              </a>
              <p className="text-white2"> {comments[0].comment}</p>
            </div>
            <button onClick={handleLike}>
              {isLiked ? <LikeFilled /> : <Like />}
            </button>
          </div>
        )
      }
    </div>
  );
};

const Author = ({ post }: { post: Post }) => {
  const { user, createdAt } = post;
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-2 text-white hover:text-yellow">
        <AvatarComment avatar={user.avatar} userID={user._id} />
        <a href={`/users/${user._id}`} className="font-ubuntu-500">
          {user.first_name} {user.last_name}
        </a>
      </div>
      <Date date={createdAt} />
    </div>
  );
};

const PostContent = ({ post }: { post: Post }) => {
  const { text, user, image } = post;
  const userContext = useContext(UserContext);
  const [isLiked, setIsLiked] = useState<boolean>();

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

  useEffect(() => {
    userContext.user && setIsLiked(post.likes.includes(userContext.user._id));
  }, [userContext.user]);

  return (
    <div>
      <PostImage user={user} image={image} />
      <div className="px-4">
        <PostLikes post={post} isLiked={isLiked} handleLike={handleLike} />
        <div className="flex gap-1">
          <a
            href={`/users/${user._id}`}
            className="font-ubuntu-500 text-white hover:text-yellow"
          >
            {user.first_name} {user.last_name}
          </a>
          <p className="font-ubuntu text-white2">{text}</p>
        </div>
      </div>
    </div>
  );
};

const PostLikes = ({
  post,
  isLiked,
  handleLike,
}: {
  post: Post;
  isLiked: boolean | undefined;
  handleLike: () => void;
}) => {
  const { likes } = post;
  return (
    <div className="flex flex-col items-start mt-2">
      <div onClick={handleLike} className="hover:cursor-pointer">
        {isLiked ? <LikeFilled /> : <Like />}
      </div>
      <div className="text-white font-ubuntu-500 text-sm">
        {likes.length} likes
      </div>
    </div>
  );
};

const PostImage = ({ user, image }: { user: ShortUser; image: Avatar }) => {
  return (
    image !== undefined && (
      <Image
        src={`data:${image.contentType};base64,${Buffer.from(
          image.data!
        ).toString("base64")}`}
        width={400}
        height={0}
        className="w-full h-60 object-cover border-2 border-solid border-mid-green md:h-auto"
        alt={`Post pic, uploaded by ${user.first_name} ${user.last_name}`}
      />
    )
  );
};

export default PostArticle;

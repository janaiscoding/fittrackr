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
import CommentSVG from "../assets/svgs/CommentSVG";
import AvatarPost from "./images/AvatarPost";
import DeleteSVG from "../assets/svgs/DeleteSVG";

const PostArticle = ({ post }: { post: Post }) => {
  const [comments, setComments] = useState<Comment[]>(post.comments); // Set initial comments
  return (
    <article id={post._id} className="bg-blue rounded py-2 md:max-w-lg">
      <Author post={post} />
      <PostContent post={post} comments={comments} setComments={setComments} />
      <Comments post={post} comments={comments} setComments={setComments} />
    </article>
  );
};

type CommentFormTypes = {
  postID: string;
  refresher: boolean;
  setRefresher: React.Dispatch<SetStateAction<boolean>>;
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
      handleSuccess,
      handleError
    );
  };
  const handleError = (msg: string) => {
    setCommentError(msg);
    //error popup
  };
  const handleSuccess = () => {
    console.log("success!!");
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
        className="text-white w-full bg-blue outline-none pt-2 pr-12 pl-8"
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

const CommentContainer = ({
  postID,
  comm,
}: {
  postID: string;
  comm: Comment;
}) => {
  const { comment, user, _id, createdAt } = comm;
  const userContext = useContext(UserContext);
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isSame, setIsSame] = useState<boolean>();

  const handleLike = () => {
    fetch(`https://fiturself.fly.dev/posts/${postID}/${_id}/like`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      body: JSON.stringify({ userID: userContext.user?._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        comm.likes = data.likes;
        setIsLiked(!isLiked);
      })
      .catch((err) => console.log(err));
  };
  const openModal = () => {
    console.log("open delete modal");
  };
  useEffect(() => {
    if (comment && userContext.user) {
      setIsLiked(comm.likes.includes(userContext.user!._id));
      setIsSame(userContext.user._id === user._id);
    }
  }, [userContext.user]);
  //avatar //name/text + date
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-1 items-center">
          <div className="flex flex-col">
            <div className="flex gap-1 items-center">
              <AvatarComment avatar={user.avatar} userID={user._id} />
              <a
                href={`/users/${user._id}`}
                className="text-white hover:text-yellow"
              >
                {user.first_name} {user.last_name}
              </a>
              <Date date={createdAt} />
            </div>
            <p className="text-white2 break-all ml-8"> {comment}</p>
          </div>
        </div>
        <div className="flex gap-1 items-start">
          <button onClick={handleLike} aria-label="Like comment toggle icon">
            {isLiked ? <LikeFilled /> : <Like />}
          </button>
          <button onClick={openModal} aria-label="Delete this comment">
            {isSame && <DeleteSVG />}
          </button>
        </div>
      </div>
    </div>
  );
};

const Comments = ({
  post,
  comments,
  setComments,
}: {
  post: Post;
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
  comments: Comment[];
}) => {
  const [refresher, setRefresher] = useState(false);

  useEffect(() => {
    getPostComments(post._id, setComments);
    // Update everytime the comment form is successful
  }, [refresher]);
  return (
    <div>
      {comments.length > 0 && (
        <div className="px-4 text-white2 text-ubuntu border-solid border-b border-grey py-2">
          {comments.map((c) => (
            <CommentContainer key={c._id} postID={post._id} comm={c} />
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

const Author = ({ post }: { post: Post }) => {
  const { user, createdAt } = post;
  const userContext = useContext(UserContext);
  const [isSame, setIsSame] = useState<boolean>();

  const openModal = () => {
    console.log("open delete modal");
  };
  useEffect(() => {
    if (userContext.user) {
      setIsSame(userContext.user._id === user._id);
    }
  }, [userContext.user]);
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-2 text-white hover:text-yellow">
        <AvatarPost avatar={user.avatar} userID={user._id} />
        <a href={`/users/${user._id}`} className="font-ubuntu-500">
          {user.first_name} {user.last_name}
        </a>
      </div>
      <div className="flex gap-1 items-center">
        <Date date={createdAt} />
        <button aria-label="Delete current post button" onClick={openModal}>
          {isSame && <DeleteSVG />}
        </button>
      </div>
    </div>
  );
};

const PostContent = ({
  post,
  comments,
  setComments,
}: {
  post: Post;
  comments: Comment[];
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
}) => {
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
      <p className="font-ubuntu px-4 text-white break-all max-w-sm">{text}</p>
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

const PostStats = ({
  post,
  comments,
  isLiked,
  handleLike,
}: {
  post: Post;
  isLiked: boolean | undefined;
  handleLike: () => void;
  comments: Comment[];
}) => {
  const { likes } = post;
  return (
    <div className="flex items-start mt-2 gap-1">
      <div>
        <div
          onClick={handleLike}
          className="hover:cursor-pointer"
          aria-label="Toggle like button"
        >
          {isLiked ? <LikeFilled /> : <Like />}
        </div>
        <div className="text-white2 font-ubuntu-500 text-sm">
          {likes.length} {likes.length === 1 ? "like" : "likes"}
        </div>
      </div>
      <div aria-label="Comment icon and comment count">
        <CommentSVG />
        <div className="text-white2 font-ubuntu-500 text-sm">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </div>
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

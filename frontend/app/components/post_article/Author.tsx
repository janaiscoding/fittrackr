import deletePost from "@/app/api/posts/delete_post";
import getPosts from "@/app/api/posts/get_posts";
import DeleteSVG from "@/app/assets/svgs/DeleteSVG";
import { PostsContext } from "@/app/context/postsContext";
import { useContext } from "react";
import { Date } from "../Date";
import AvatarPost from "../images/AvatarPost";
import { Post } from "@/app/__types__/types";

const Author = ({
  post,
  isSame,
}: {
  post: Post;
  isSame: boolean | undefined;
}) => {
  const { user, createdAt } = post;
  const postsContext = useContext(PostsContext);
  const openModal = () => {
    console.log("open delete modal");
    // add this on confirm v
    deletePost(post._id, handleSuccessDELETE);
  };
  const handleSuccessDELETE = () => {
    //Updating PostsContext.
    getPosts(postsContext.setPosts);
  };

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

export default Author;

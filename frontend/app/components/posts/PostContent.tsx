import { useContext, useState } from "react";
import CommunityPicture from "../images/CommunityPicture";
import { UserContext } from "@/app/context/userContext";
import DeletePostModal from "./DeletePostModal";
import { Post } from "@/app/__types__/types";
import { Date } from "../Date";
import DeleteSVG from "@/app/assets/svgs/DeleteSVG";
import PostImage from "../images/PostImage";
import { usePathname } from "next/navigation";
import getProfile from "@/app/api/users/get_profile";
import deletePost from "@/app/api/posts/delete_post";



const PostContent = ({ post }: { post: Post }) => {
  const { _id, text, user, image, createdAt } = post;
  const [isOpen, setOpen] = useState(false);
  
  const userContext = useContext(UserContext);
  const path = usePathname();
  
  const handleDelete = () => {
    deletePost(_id)
      .then(() => {
        setOpen(false);
      })
      .then(() => {
        //updating posts count on signed in user
        if (path === `/users/${userContext.user?._id}`) {
          getProfile(userContext.user?._id, userContext.setUser);
        }
        if (path === "/") {
          console.log("need to refresh posts on main page");
          document.getElementById(_id)?.remove(); // Remove from dom instead of re-fetching all posts
        }
      });
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <CommunityPicture avatar={user.avatar} userID={user._id} />
          <div>
            <a className="text-green text-xl" href={`/users/${user._id}`}>
              {user.first_name} {user.last_name}
            </a>
            <Date date={createdAt} />
          </div>
        </div>
        <div onClick={() => setOpen(true)}>
          {userContext.user?._id === user._id && <DeleteSVG />}
        </div>
        {isOpen && (
          <DeletePostModal handleDelete={handleDelete} setOpen={setOpen} />
        )}
      </div>
      <p>{text}</p>
      {image !== undefined && <PostImage image={image} />}
    </>
  );
};

export default PostContent;

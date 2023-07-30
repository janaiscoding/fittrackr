import { useContext, useState } from "react";
import CommunityPicture from "../images/CommunityPicture";
import { UserContext } from "@/app/context/userContext";
import DeletePostModal from "./DeletePostModal";
import deletePost from "@/app/api/delete_post";
import { Post } from "@/app/__types__/types";
import { Date } from "../Date";
import DeleteSVG from "@/app/assets/svgs/DeleteSVG";
import PostImage from "../images/PostImage";

const PostContent = ({ post }: { post: Post }) => {
  const { _id, text, user, image, createdAt } = post;
  const [isOpen, setOpen] = useState(false);
  const handleDelete = () => {
    deletePost(_id).then(() => {
      const element = document.getElementById(_id);
      element?.remove();
    });
  };

  const userContext = useContext(UserContext);
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

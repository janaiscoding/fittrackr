import { PostsContext } from "@/app/context/postsContext";
import getPostsSetter from "@/app/utils/api/posts/posts_setter";
import updatePost from "@/app/utils/api/posts/update_post";
import Close from "@/app/utils/assets/svgs/Close";
import { Post } from "@/app/utils/types";
import { SetStateAction, useContext, useState } from "react";

type UpdateProps = {
  post: Post;
  setShowEditModal: React.Dispatch<SetStateAction<boolean>>;
};

const EditPostModal = ({ post, setShowEditModal }: UpdateProps) => {
  const postsContext = useContext(PostsContext);
  const [updateDescription, setUpdateDescription] = useState(post.description);
  const handleEdit = () => {
    const handleSuccessEdit = () => {
      setShowEditModal(false);
      getPostsSetter(postsContext.setPosts);
    };
    updatePost(post._id, post.user._id, updateDescription);
  };

  return (
    <div className="w-full h-full left-0 top-0 overflow-auto bg-gray-700/70 flex fixed z-[1000] justify-center items-center">
      <div className="bg-white p-6 fixed z-[100] w-full md:max-w-sm  top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu">
        <div className="flex justify-between">
          <p className="text-xl font-ubuntu-500 text-secondary text-center">
            Update post description
          </p>
          <div
            onClick={() => setShowEditModal(false)}
            className="hover:bg-gray-700/10 rounded-full p-1 hover:cursor-pointer"
          >
            <Close />
          </div>
        </div>
        <input
          type="text"
          value={updateDescription}
          className="text-secondary w-full bg-transparent outline-none pt-2 pr-12 my-2 border"
          onChange={(e) => {
            setUpdateDescription(e.target.value);
          }}
        />
        <div className="flex gap-2 font-ubuntu-500 text-lg gap-2 justify-between">
          <button
            onClick={handleEdit}
            className="bg-green-900 text-white  py-1 px-3 hover:bg-green-950 hover:text-white"
          >
            Save
          </button>
          <button
            onClick={() => setShowEditModal(false)}
            className="text-secondary bg-gray-700/10 hover:text-black hover:bg-gray-700/20 border-solid py-1 px-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;

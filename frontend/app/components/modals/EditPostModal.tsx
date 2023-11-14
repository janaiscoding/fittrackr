import { PostsContext } from "@/app/context/postsContext";
import getPostsSetter from "@/app/utils/api/posts/posts_setter";
import updatePost from "@/app/utils/api/posts/update_post";
import Close from "@/app/utils/assets/svgs/Close";
import { Post } from "@/app/utils/types";
import { SetStateAction, useContext, useEffect, useState } from "react";

type UpdateProps = {
  post: Post;
  setShowEditModal: React.Dispatch<SetStateAction<boolean>>;
};

const EditPostModal = ({ post, setShowEditModal }: UpdateProps) => {
  const postsContext = useContext(PostsContext);
  const [uDescription, setUpdateDescription] = useState(post.description);
  const [updateError, setUpdateError] = useState("");

  const handleEdit = () => {
    const handleSuccessEdit = () => {
      setShowEditModal(false);
      getPostsSetter(postsContext.setPosts);
      setUpdateError("");
    };

    updatePost(post._id, uDescription, handleSuccessEdit, setUpdateError);
  };
  useEffect(() => {
    // Solution found on: https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      //@ts-ignore
      this.style.height = 0;
      //@ts-ignore
      this.style.height = this.scrollHeight + "px";
    }
  }, []);

  return (
    <div className="w-full h-full left-0 top-0 overflow-auto bg-gray-700/70 flex fixed z-[1000] justify-center items-center">
      <div className="bg-white dark:bg-gray-900 p-6 fixed z-[100] w-full h-auto md:max-w-sm  top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu">
        <div className="flex justify-between">
          <p className="text-xl font-ubuntu-500 text-secondary dark:text-gray-300 text-center">
            Update post description
          </p>
          <div
            onClick={() => setShowEditModal(false)}
            className="hover:bg-gray-700/10 rounded-full p-1 hover:cursor-pointer"
          >
            <Close />
          </div>
        </div>

        {updateError.length > 1 && (
          <p className="text-sm text-error">{updateError}</p>
        )}

        <textarea
          rows={1}
          value={uDescription}
          className="p-2 resize-none w-full border text-secondary"
          onChange={(e) => {
            setUpdateDescription(e.target.value);
            if (uDescription.length < 140 && updateError.length > 1) {
              setUpdateError("");
            }
          }}
        />
        <div className="flex gap-2 font-ubuntu-500 text-lg gap-4 justify-center">
          <button
            onClick={handleEdit}
            className="bg-green-900 text-white  py-1 px-3 hover:bg-green-950 hover:text-white"
          >
            Save
          </button>
          <button
            onClick={() => setShowEditModal(false)}
            className="text-secondary bg-gray-700/10 dark:bg-gray-300 hover:dark:bg-gray-400 hover:text-black hover:bg-gray-700/20 border-solid py-1 px-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;

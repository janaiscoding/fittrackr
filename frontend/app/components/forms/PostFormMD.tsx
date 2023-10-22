import createPost from "@/app/utils/api/posts/create_post";
import getPosts from "@/app/utils/api/posts/get_posts";
import getProfile from "@/app/utils/api/users/get_profile";
import SendSVG from "@/app/utils/assets/svgs/SendSVG";
import UploadSVG from "@/app/utils/assets/svgs/Upload";
import { PostsContext } from "@/app/context/postsContext";
import { UserContext } from "@/app/context/userContext";
import { SyntheticEvent, useContext, useState } from "react";
import getPostsSetter from "@/app/utils/api/posts/posts_setter";

const PostFormMD = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<any>(undefined);

  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    if (userContext.user) formData.append("userID", userContext.user._id);
    if (file) {
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
    }
    if (text.length === 0) {
      //Rather than waiting for the server response, this is pre-handled here instead
      setError("Post is too short.");
    } else {
      createPost(formData, handleError, handleSuccess);
    }
  };

  const handleError = (data: string) => {
    setError(data);
    setSuccess(false);
    // setFile(undefined);
  };

  const handleSuccess = () => {
    //Display success message
    setSuccess(true);
    clearData();
    //Update postsContext
    getPostsSetter(postsContext.setPosts);
    //@ts-ignore
    // getProfile(userContext.user?._id, userContext.setUser);

    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  const clearData = () => {
    setText(" ");
    setFile(undefined);
    setError(" ");
  };
  return (
    <div className="flex-col flex p-4 bg-bgContainers">
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-1">
        <input
          value={text}
          placeholder="What's on your mind?"
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.length > 1) {
              setError(" ");
            }
          }}
          className="text-secondary w-full bg-accent/10 outline-none focus:ring-1 ring-outline rounded py-2 pb-10 px-4 pr-12 mb-2"
        />
        <div className="self-end flex gap-4 text-sm items-center">
          <div className="font-open flex flex-col items-center gap-2">
            {success && <p className="text-xs text-valid">Post sent!</p>}
            {error.length > 1 && <p className="text-xs text-error">{error}</p>}
          </div>
          <label
            htmlFor="upload-image"
            className="border border-outline hover:cursor-pointer hover:bg-accent/30 border-solid py-1 px-3 rounded flex gap-1 items-center justify-between"
            aria-label="Upload a new picture"
          >
            <UploadSVG />
            <input
              type="file"
              name="myImage"
              accept="image/*"
              id="upload-image"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files![0]);
              }}
            />
          </label>

          <button
            aria-label="Send a new post"
            type="submit"
            className="flex gap-1 items-center text-secondary justify-between border border-outline hover:bg-accent/30 border-solid py-1 px-3 rounded"
          >
            <SendSVG />
            <p>Create Post</p>
          </button>
        </div>
        {file && (
          <p className="font-ubuntu text-xs text-secondary">
            File ready for upload:{" "}
            <span className="text-accent">{file.name}</span>
          </p>
        )}
      </form>
    </div>
  );
};
export default PostFormMD;

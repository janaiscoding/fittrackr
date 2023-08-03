import createPost from "@/app/api/posts/create_post";
import getPosts from "@/app/api/posts/get_posts";
import SendSVG from "@/app/assets/svgs/SendSVG";
import UploadSVG from "@/app/assets/svgs/Upload";
import { PostsContext } from "@/app/context/postsContext";
import { UserContext } from "@/app/context/userContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { SyntheticEvent, useContext, useState } from "react";

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
    createPost(formData, handleError, handleSuccess);
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
    getPosts(postsContext.setPosts);
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
    <div className="flex-col hidden md:flex">
      <h1 className="text-2xl font-ubuntu-500 self-start border-b-2 border-yellow2">
        Feed..
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-1 my-4"
      >
        <input
          value={text}
          placeholder="What's on your mind?"
          onChange={(e) => setText(e.target.value)}
          className="text-white w-full bg-blue outline-none rounded py-2 pb-10 px-4 pr-12 resize-none"
        />
        <div className="font-open flex flex-col gap-2">
          {success && "Post sent!"}
          {error && <p className="text-error">{error}</p>}
          {file && <p className="text-white2">{file.name}</p>}
        </div>
        <div className="self-end flex gap-4 text-sm">
          <label
            htmlFor="upload-image"
            className="border border-yellow2 border-solid py-1 px-3 rounded flex gap-1 items-center justify-between"
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
            <p>Upload Image</p>
          </label>

          <button
            aria-label="Send a new post"
            type="submit"
            className="flex gap-1 items-center justify-between border border-yellow2 border-solid py-1 px-3 rounded"
          >
            <SendSVG />
            <p>Create Post</p>
          </button>
        </div>
      </form>
    </div>
  );
};
export default PostFormMD;

import { SyntheticEvent, useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import SendSVG from "../../assets/svgs/SendSVG";
import { usePathname, useRouter } from "next/navigation";
import UploadSVG from "@/app/assets/svgs/Upload";
import createPost from "@/app/api/posts/create_post";
import Close from "@/app/assets/svgs/Close";
import { PostsContext } from "@/app/context/postsContext";
import getPosts from "@/app/api/posts/get_posts";
import { ModalContext } from "@/app/context/modalContext";

const FormModal = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<any>(undefined);

  const router = useRouter();
  const path = usePathname();

  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);
  const modalContext = useContext(ModalContext);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // always needs text and userID, the file image is optional
    const formData = new FormData();
    formData.append("text", text);
    if (userContext.user) formData.append("userID", userContext.user._id);
    if (file) {
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
    }
    //Handle length error here rather than calling the API.
    if (text.length === 0) {
      setError("Post is too short");
    } else {
      createPost(formData, handleError, handleSuccess);
    }
  };

  const handleError = (data: string) => {
    setError(data);
    setSuccess(false);
    setFile(undefined);
  };

  const handleSuccess = () => {
    //Display success message
    setSuccess(true);
    //Update postsContext
    getPosts(postsContext.setPosts);

    setTimeout(() => {
      //Close form
      handleClose();
      // Redirect if not on / or /:id
      if (
        userContext.user &&
        path !== "/" &&
        path !== `/users/${userContext.user._id}`
      ) {
        router.push("/");
      }
    }, 500);
  };

  const clearData = () => {
    setFile(undefined);
    setError(" ");
    setSuccess(false);
  };

  const handleClose = () => {
    clearData();
    modalContext.setModalPost(false);
  };

  return (
    <div className="bg-black p-6 fixed z-[100] top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu md:hidden rounded">
      <div className="flex justify-between items-center">
        <h1 className="text-xl my-2 text-yellow">Create a new post!</h1>
        <button onClick={handleClose} aria-label="Close create new post form">
          <Close />
        </button>
      </div>
      <form
        className="flex items-center justify-between gap-2"
        onSubmit={(e) => handleSubmit(e)}
        encType="multipart/form-data"
      >
        <label className="w-full basis-full">
          <input
            type="text"
            className="text-white w-full !bg-blue outline-none py-2 pl-4 pr-12 rounded "
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </label>
        <div className="flex gap-2">
          <label htmlFor="upload-image" aria-label="Upload a new picture">
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

          <button type="submit" aria-label="Submit your new post">
            <SendSVG />
          </button>
        </div>
      </form>
      {file !== undefined && <p className="text-green">{file.name}</p>}
      <p className="text-red">{error}</p>
      {success && <p className="text-green">Post sent</p>}
    </div>
  );
};

export default FormModal;

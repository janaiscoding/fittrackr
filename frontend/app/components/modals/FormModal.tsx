import { SyntheticEvent, useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import SendSVG from "../../utils/assets/svgs/SendSVG";
import { usePathname, useRouter } from "next/navigation";
import UploadSVG from "@/app/utils/assets/svgs/Upload";
import createPost from "@/app/utils/api/posts/create_post";
import Close from "@/app/utils/assets/svgs/Close";
import { PostsContext } from "@/app/context/postsContext";
import getPosts from "@/app/utils/api/posts/get_posts";
import { ModalContext } from "@/app/context/modalContext";
import getContextUser from "@/app/utils/api/auth/get_context_user";

const FormModal = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<any>(undefined); // ERROR HERE.

  const router = useRouter();
  const path = usePathname();

  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);
  const modalContext = useContext(ModalContext);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Always needs text and userID, the file image is optional
    const formData = new FormData();
    formData.append("text", text);
    if (userContext.user) formData.append("userID", userContext.user._id);
    if (file) {
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
    }
    // Handle length error here, rather than calling the API.
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
    // Refresh user context
    getContextUser(userContext.user?._id, userContext.setUser)

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
    <div className="bg-black p-6 fixed z-[100] w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu md:hidden rounded">
      <div className="flex justify-between items-center">
        <h1 className="text-xl my-2 text-accent">Create a new post!</h1>
        <button onClick={handleClose} aria-label="Close create new post form">
          <Close />
        </button>
      </div>
      <form
        className="flex items-center justify-between gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="w-full basis-full">
          <input
            type="text"
            className="text-white w-full !bg-bgContainers outline-none py-2 pl-4 pr-12 rounded "
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.length > 1) {
                setError(" ");
              }
            }}
          />
        </label>
        <div className="flex gap-2">
          <label
            htmlFor="upload-image-mobile"
            aria-label="Upload a new picture"
          >
            <UploadSVG />
            <input
              type="file"
              name="myImage"
              accept="image/*"
              id="upload-image-mobile"
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
      {file && (
        <p className="font-ubuntu text-xs text-white">
          File ready for upload: {file.name}
        </p>
      )}
      {error && <p className="text-error">{error}</p>}
      {success && <p className="text-valid">Post sent</p>}
    </div>
  );
};

export default FormModal;

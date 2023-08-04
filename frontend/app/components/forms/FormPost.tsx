import {
  SetStateAction,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { getJwtToken } from "../../api/auth/auth_handler";
import { UserContext } from "../../context/userContext";
import SendSVG from "../../assets/svgs/SendSVG";
import { usePathname, useRouter } from "next/navigation";
import { postsAPI } from "../../api/endpoints";
import UploadSVG from "@/app/assets/svgs/Upload";
import getProfile from "@/app/api/users/get_profile";
import createPost from "@/app/api/posts/create_post";
import Close from "@/app/assets/svgs/Close";
import { PostsContext } from "@/app/context/postsContext";
import getPosts from "@/app/api/posts/get_posts";

const FormPost = ({
  setShown,
}: {
  setShown: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<any>(undefined);

  const router = useRouter();
  const path = usePathname();
  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    //if file
    const formData = new FormData();
    formData.append("text", text);
    if (userContext.user) formData.append("userID", userContext.user._id);
    if (file) {
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
    }
    if (text.length === 0) {
      setError("Post is too short");
    } else {
      console.log("still here")
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
    setShown(false);
  };

  return (
    <div className="absolute bg-transparent p-6 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl my-2">Create a new post!</h1>
        <button onClick={handleClose} aria-label="Close create new post form">
          <Close />
        </button>
      </div>
      <form
        className="flex items-center"
        onSubmit={(e) => handleSubmit(e)}
        encType="multipart/form-data"
      >
        <label>
          <input
            type="text"
            className="w-full"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </label>
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
      </form>
      {file !== undefined && <p className="text-green">{file.name}</p>}
      <p className="text-red">{error}</p>
      {success && <p className="text-green">Post sent</p>}
    </div>
  );
};

export default FormPost;

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
import AvatarPost from "../images/AvatarPost";

const FormModal = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<any>(undefined); // ERROR HERE.
  const [isLoading, setLoading] = useState(true); // loading posts while fetching

  const router = useRouter();
  const path = usePathname();

  const userContext = useContext(UserContext);
  const postsContext = useContext(PostsContext);
  const modalContext = useContext(ModalContext);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Always needs text and userID, the file image is optional
    const formData = new FormData();
    formData.append("description", description);
    if (userContext.user) formData.append("userID", userContext.user._id);
    if (file) {
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
    }
    // Handle length error here, rather than calling the API.
    if (description.length === 0) {
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
    //console.log("posts context is now fixed");
    getPosts(postsContext.setPosts, () => {
      setLoading(false);
    });
    // Refresh user context
    getContextUser(userContext.user?._id, userContext.setUser);

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
    <div className="w-full h-full left-0 top-0 overflow-auto bg-gray-700/70 flex fixed z-[1000] justify-center items-center">
      <div className="bg-white p-6 fixed z-[100] w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu md:hidden">
        <div className="flex justify-between items-center">
          <h1 className="text-xl my-2 text-secondary">Create a post</h1>
          <button onClick={handleClose} aria-label="Close create new post form">
            <Close />
          </button>
        </div>
        <div className="flex gap-2 items-center my-2">
          <AvatarPost
            isAuthor={true}
            avatar={userContext.user!.avatar}
            userID={userContext.user!._id}
          />
          <p className="text-secondary text-xl">
            {userContext.user?.first_name} {userContext.user?.last_name}
          </p>
        </div>
        <form
          className="flex flex-col items-center justify-between gap-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label className="w-full basis-full">
            <input
              type="text"
              placeholder="What's on your mind?"
              className="text-secondary w-full !bg-bgContainers outline-none py-2 pl-4 pr-12 rounded "
              onChange={(e) => {
                setDescription(e.target.value);
                if (e.target.value.length > 1) {
                  setError(" ");
                }
              }}
            />
          </label>
          <div className="flex justify-between w-full gap-2">
            <label
              htmlFor="upload-image-mobile"
              aria-label="Upload a new picture"
              className="flex text-accent gap-2 items-center"
            >
              <UploadSVG />
              <p>Add Image</p>
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

            <button
              type="submit"
              aria-label="Submit your new post"
              className="flex gap-2 items-center text-accent"
            >
              <SendSVG />
              <p>Post</p>
            </button>
          </div>
        </form>
        {file && (
          <p className="font-ubuntu text-xs text-secondary">
            File ready for upload: {file.name}
          </p>
        )}
        {error && <p className="text-error">{error}</p>}
        {success && <p className="text-valid">Post sent</p>}
      </div>
    </div>
  );
};

export default FormModal;

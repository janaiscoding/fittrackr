import { ImageType, User } from "@/app/utils/types";
import uploadAvatar from "@/app/utils/api/users/upload_avatar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import UploadSVG from "@/app/utils/assets/svgs/Upload";
import ErrorPopup from "../popups/ErrorPopup";
import { CldImage } from "next-cloudinary";
import { PostsContext } from "@/app/context/postsContext";
import getPostsSetter from "@/app/utils/api/posts/posts_setter";

// This component is on user profiles, it displays picture and an icon for uploading a new avatar if you're on your profile.
const AvatarProfile = ({
  avatar,
  isSame,
}: {
  avatar: ImageType;
  isSame: boolean | undefined;
}) => {
  const [uploadErrors, setUploadErrors] = useState(" ");
  const [showError, setShowError] = useState(false);
  const [file, setFile] = useState<any>();

  const postsContext = useContext(PostsContext)
  const userContext = useContext(UserContext);

  const handleSuccess = (updatedUser: User) => {
    setFile(undefined);
    setUploadErrors(" ");
    //When the upload is a success, I get back the updated user from the API, and I am now setting my new contexts.
    userContext.setUser(updatedUser);
    getPostsSetter(postsContext.setPosts)
  };

  const handleError = (data: string) => {
    setShowError(true);
    setUploadErrors(data);
  };

  const cancelError = () => {
    setShowError(false);
    setUploadErrors(" ");
    setFile(undefined);
  };

  useEffect(() => {
    // Auto-upload user avatar whenever the file changes.
    const formData = new FormData();
    if (file && userContext.user) {
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
      uploadAvatar(userContext.user._id, formData, handleSuccess, handleError);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      <div className="relative">
        <CldImage
          src={avatar.url}
          width={400}
          height={400}
          className="rounded-full object-cover max-w-[5rem] max-h-[5rem] min-w-[5rem] min-h-[5rem] md:max-w-[6rem] md:max-h-[6rem] md:min-w-[6rem] md:min-h-[6rem]"
          alt={avatar.alt}
        />
        {isSame && (
          <label
            htmlFor="upload-avatar-edit-view"
            className="flex items-center absolute top-[60%] left-[60%] bg-white/90 p-2 rounded-full dark:bg-gray-800/60 dark:hover:bg-gray-900 hover:text-accent bg-slate-700/20 hover:bg-slate-700/10 p-2 hover:cursor-pointer"
          >
            <UploadSVG />
            <input
              type="file"
              name="myImage"
              id="upload-avatar-edit-view"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files![0])}
            />
          </label>
        )}
      </div>

      {showError && (
        <ErrorPopup message={uploadErrors} cancelError={cancelError} />
      )}
    </>
  );
};

export default AvatarProfile;

import { ImageType, User } from "@/app/utils/types";
import uploadAvatar from "@/app/utils/api/users/upload_avatar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import UploadSVG from "@/app/utils/assets/svgs/Upload";
import ErrorPopup from "../popups/ErrorPopup";
import { CldImage } from "next-cloudinary";

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

  const userContext = useContext(UserContext);

  const handleSuccess = (updatedUser: User) => {
    setFile(undefined);
    setUploadErrors(" ");
    //When the upload is a success, I get back the updated user from the API, and I am now setting my new context.
    userContext.setUser(updatedUser);
  };

  const handleError = (data: string) => {
    setUploadErrors(data);
    // todo: pop-up for error - change the transition
    setShowError(true);
    setTimeout(() => {
      // Clear error after it was displayed to the user.
      setShowError(false);
      setUploadErrors(" ");
      setFile(undefined);
    }, 1500);
  };

  useEffect(() => {
    // Auto-upload user avatar.
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
          width={200}
          height={200}
          className="md:w-28 w-12 md:h-28 h-12 rounded-full object-cover profile-image border-white/30 border border-solid"
          alt={avatar.alt}
        />
        {isSame && (
          <label
            htmlFor="upload-avatar-edit-view"
            className="flex items-center absolute top-[60%] left-[60%] bg-white/60 border-white/30 border border-solid p-2 rounded-full hover:bg-white/90 hover:cursor-pointer"
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

      {showError && <ErrorPopup message={uploadErrors} />}
    </>
  );
};

export default AvatarProfile;

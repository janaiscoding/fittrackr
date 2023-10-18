import Image from "next/image";
import { Avatar } from "@/app/utils/types";
import uploadAvatar from "@/app/utils/api/users/upload_avatar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import UploadSVG from "@/app/utils/assets/svgs/Upload";
import getProfile from "@/app/utils/api/users/get_profile";
import ErrorPopup from "../popups/ErrorPopup";
import defaultPic from "../../../public/assets/default_avatar.jpg";

const AvatarProfile = ({
  avatar,
  userID,
  isSame,
}: {
  avatar: Avatar;
  userID: string;
  isSame: boolean | undefined;
}) => {
  const [uploadErrors, setUploadErrors] = useState(" ");
  const [showError, setShowError] = useState(false);
  const [file, setFile] = useState<any>();

  const userContext = useContext(UserContext);
  const { currentUser } = useCurrentUser();

  const handleSuccess = () => {
    //@ts-ignore
    getProfile(currentUser._id, userContext.setUser);
    setFile(undefined);
    setUploadErrors(" ");
  };

  const handleError = (data: string) => {
    setUploadErrors(data);
    // todo: pop-up for error - change the transition
    setShowError(true);
    setTimeout(() => {
      // Clear error after it was displayed to the user.
      setShowError(false);
      setUploadErrors(" ");
    }, 1000);
  };

  useEffect(() => {
    // Auto-upload user avatar.
    const formData = new FormData();
    if (file) {
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
      uploadAvatar(currentUser._id, formData, handleSuccess, handleError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      {avatar !== undefined ? (
        <div className="relative">
          <Image
            src={`data:${avatar.contentType};base64,${Buffer.from(
              avatar.data
            ).toString("base64")}`}
            width={40}
            height={0}
            className="w-12 h-12 rounded-full object-cover profile-image border-white/30 border border-solid"
            alt="user-profile-picture"
          />
          {isSame && (
            <label
              htmlFor="upload-avatar-edit-view"
              className="flex items-center absolute top-[60%] left-[60%] bg-black/50 border-white/30 border border-solid p-2 rounded-full hover:bg-black hover:cursor-pointer"
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
      ) : (
        <Image
          src={defaultPic}
          className="w-12 h-12 rounded-full object-cover post-avatar-image"
          alt="user-default-profile-picture"
        />
      )}
      {showError && <ErrorPopup message={uploadErrors} />}
    </>
  );
};

export default AvatarProfile;

import { ImageType, User } from "@/app/utils/types";
import uploadAvatar from "@/app/utils/api/users/upload_avatar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import ErrorPopup from "../popups/ErrorPopup";
import { CldImage } from "next-cloudinary";
import uploadBanner from "@/app/utils/api/users/upload_banner";

// This component is on user profiles, it displays banner and an icon for uploading a new banner if you're on your profile.
const AvatarBanner = ({
  banner,
  isSame,
}: {
  banner: ImageType;
  isSame: boolean | undefined;
}) => {
  const [uploadErrors, setUploadErrors] = useState(" ");
  const [showError, setShowError] = useState(false);
  const [bannerFile, setBanner] = useState<any>();

  const userContext = useContext(UserContext);

  const handleSuccess = (updatedUser: User) => {
    setBanner(undefined);
    setUploadErrors(" ");
    //When the upload is a success, I get back the updated user from the API, and I am now setting my new contexts.
    userContext.setUser(updatedUser);
  };

  const handleError = (data: string) => {
    setShowError(true);
    setUploadErrors(data);
  };

  const cancelError = () => {
    setShowError(false);
    setUploadErrors(" ");
    setBanner(undefined);
  };

  useEffect(() => {
    // Auto-upload user banner whenever the file changes.
    const formData = new FormData();
    if (bannerFile && userContext.user) {
      formData.append("myBanner", bannerFile);
      formData.append("mimeType", bannerFile.type);
      uploadBanner(userContext.user._id, formData, handleSuccess, handleError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerFile]);

  return (
    <div className="w-full basis-full">
      <div className="relative w-full">
        <CldImage
          src={banner.url}
          width={800}
          height={800}
          className="w-full object-cover h-40"
          alt={banner.alt}
        />
        {isSame && (
          <label
            htmlFor="upload-banner-edit-view"
            className="flex items-center absolute top-0 left-0 md:text-xl text-white bg-gray-800/60 hover:bg-gray-900 p-2 hover:cursor-pointer"
          >
            Change banner
            <input
              type="file"
              name="myImage"
              id="upload-banner-edit-view"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setBanner(e.target.files![0]);
              }}
            />
          </label>
        )}
      </div>

      {showError && (
        <ErrorPopup message={uploadErrors} cancelError={cancelError} />
      )}
    </div>
  );
};

export default AvatarBanner;

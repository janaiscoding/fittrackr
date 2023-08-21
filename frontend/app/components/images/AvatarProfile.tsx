import Image from "next/image";
import { Avatar } from "@/app/utils/types";
import uploadAvatar from "@/app/utils/api/users/upload_avatar";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { EditContext } from "@/app/context/editContext";
import { UserContext } from "@/app/context/userContext";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import UploadSVG from "@/app/utils/assets/svgs/Upload";
import getProfile from "@/app/utils/api/users/get_profile";

const AvatarProfile = ({
  avatar,
  userID,
  isSame,
}: {
  avatar: Avatar;
  userID: string;
  isSame: boolean | undefined;
}) => {
  const [uploadErrors, setUploadErrors] = useState("");
  const [file, setFile] = useState<any>();

  const userContext = useContext(UserContext);
  const { currentUser } = useCurrentUser();

  const handleSuccessAvatar = () => {
    //@ts-ignore
    getProfile(currentUser._id, userContext.setUser);
    setFile(undefined);
  };

  const handleErrorAvatar = (data: string) => {
    setUploadErrors(data);
    // todo: pop-up for error
  };

  useEffect(() => {
    // Auto-upload user avatar.
    const formData = new FormData();
    if (file) {
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
      uploadAvatar(
        currentUser._id,
        formData,
        handleSuccessAvatar,
        handleErrorAvatar
      );
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
        // <Image
        //   src={defaultPic}
        //   className="w-12 h-12 rounded-full object-cover post-avatar-image"
        //   alt="user-default-profile-picture"
        // />
        // TODO: ADD HERE AS WELL
        <div className="rounded-full object-cover border-2 border-solid border-outline comment-image text-center bg-bgContainers">
          ?
        </div>
      )}
    </>
  );
};

export default AvatarProfile;

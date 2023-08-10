import { User } from "@/app/__types__/types";
import getProfile from "@/app/api/users/get_profile";
import uploadAvatar from "@/app/api/users/upload_avatar";
import UploadSVG from "@/app/assets/svgs/Upload";
import ProfilePicture from "@/app/components/images/ProfilePicture";
import { UserContext } from "@/app/context/userContext";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { useContext, useEffect, useState } from "react";
import Stats from "./Stats";
import SocializeButtons from "./SocializeButtons";

const UserInfo = ({
  profile,
  isSame,
}: {
  profile: User;
  isSame: boolean | undefined;
}) => {
  const [file, setFile] = useState<any>();

  const [uploadError, setUploadError] = useState("");
  const [showError, setShowError] = useState(false);
  const [avatar, setAvatar] = useState(profile.avatar);

  const userContext = useContext(UserContext);

  const { currentUser } = useCurrentUser();

  useEffect(() => {
    const formData = new FormData();
    if (file) {
      formData.append("myImage", file);
      formData.append("mimeType", file.type);
      uploadAvatar(currentUser._id, formData, handleSuccess, handleError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleSuccess = () => {
    //@ts-ignore
    getProfile(currentUser._id, userContext.setUser);
    setFile(undefined);
  };

  const handleError = (data: string) => {
    setUploadError(data);
  };

  useEffect(() => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
      setUploadError(" ");
    }, 1000);
  }, [uploadError]);

  useEffect(() => {
    if (userContext.user?._id === profile._id) {
      setAvatar(userContext.user.avatar);
    }
  }, [userContext, profile]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {showError && <p className="text-error">{uploadError}</p>}
          <ProfilePicture avatar={avatar} />
          <div className="text-xl font-ubuntu-500 flex gap-1">
            {profile.first_name} {profile.last_name}
            {isSame && (
              <label htmlFor="upload-avatar">
                <UploadSVG />
                <input
                  type="file"
                  name="myImage"
                  id="upload-avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files![0])}
                />
              </label>
            )}
          </div>
        </div>

        {isSame && (
          <button className="flex gap-1 items-center justify-between border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded">
            Edit Profile
          </button>
        )}
        {!isSame && <SocializeButtons user={profile} />}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-white2 text-center">{profile.bio} </p>
        <Stats profile={profile} />
      </div>
    </div>
  );
};
export default UserInfo;

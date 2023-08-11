import { User } from "@/app/utils/__types__/types";
import getProfile from "@/app/utils/api/users/get_profile";
import uploadAvatar from "@/app/utils/api/users/upload_avatar";
import UploadSVG from "@/app/utils/assets/svgs/Upload";
import { UserContext } from "@/app/context/userContext";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import Stats from "./Stats";
import SocializeButtons from "./SocializeButtons";
import { EditContext } from "@/app/context/editContext";
import Title from "../Title";
import AvatarPost from "../images/AvatarPost";
import UploadButtonToggle from "../toggles/UploadButtonToggle";

const UserInfo = ({
  profile,
  isSame,
}: {
  profile: User;
  isSame: boolean | undefined;
}) => {
  const editContext = useContext(EditContext);
  const [avatar, setAvatar] = useState(profile.avatar);
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (userContext.user?._id === profile._id) {
      setAvatar(userContext.user.avatar);
    }
  }, [userContext, profile]);

  return (
    <div>
      <div className="flex items-center justify-start gap-3">
        <AvatarPost avatar={avatar} userID={profile._id} />
        <div className="text-xl font-ubuntu-500 flex gap-1">
          {profile.first_name} {profile.last_name}
        </div>
        {!editContext.showEdit && isSame && <UploadButtonToggle />}
        {editContext.showEdit && <EditView profile={profile} />}
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

const EditView = ({ profile }: { profile: User }) => {
  const [showError, setShowError] = useState(false);

  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [bio, setBio] = useState(profile.bio);
  const [file, setFile] = useState<any>();

  const [uploadErrors, setUploadErrors] = useState("");
  const [avatar, setAvatar] = useState(profile.avatar);

  const userContext = useContext(UserContext);
  const { currentUser } = useCurrentUser();
  const editContext = useContext(EditContext);

  const handleSuccessAvatar = () => {
    //@ts-ignore
    getProfile(currentUser._id, userContext.setUser);
    setFile(undefined);
  };

  const handleErrorAvatar = (data: string) => {
    setUploadErrors(data);
  };

  useEffect(() => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
      setUploadErrors(" ");
    }, 1000);
  }, [uploadErrors]);

  useEffect(() => {
    if (userContext.user?._id === profile._id) {
      setAvatar(userContext.user.avatar);
    }
  }, [userContext, profile]);

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
  const handleUpdate = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(firstName, lastName, bio);
  };
  return (
    <form
      onSubmit={(e) => handleUpdate(e)}
      className="flex flex-col gap-2 justify-center bg-black p-6 fixed z-[100] w-full top-1/2 left-1/2 shadow-md -translate-x-2/4 -translate-y-2/4 w-[96%] font-ubuntu md:hidden rounded"
    >
      <Title title="Update profile" />
      <label htmlFor="upload-avatar-edit-view" className="flex items-center">
        <p className="font-open text-yellow mr-2">Change avatar</p>
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
      <label className="">
        <p className="text-sm font-open text-yellow"> First name</p>
        <input
          className="bg-blue/80 p-2 rounded"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </label>
      <label className="">
        <p className="text-sm font-open text-yellow"> Last name</p>
        <input
          className="bg-blue/80 p-2 rounded"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </label>
      <label className="">
        <p className="text-sm font-open text-yellow"> Bio</p>
        <input
          className="bg-blue/80 p-2 rounded"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
      </label>



      <div className="flex gap-2 items-center justify-center">
        <button
          type="submit"
          className="border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
        >
          Save
        </button>
        <button
          onClick={() => editContext.setShowEdit(false)}
          className="border border-yellow2 hover:border-yellow hover:bg-black border-solid py-1 px-3 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

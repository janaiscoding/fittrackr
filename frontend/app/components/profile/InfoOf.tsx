import { User } from "@/app/utils/types";
import { UserContext } from "@/app/context/userContext";
import { useContext, useEffect, useState } from "react";

import { EditContext } from "@/app/context/editContext";
import AvatarPost from "../images/AvatarPost";
import UploadButtonToggle from "../toggles/UploadButtonToggle";
import UpdateProfileModal from "../modals/UpdateProfileModal";
import StatsOf from "./StatsOf";
import SocializeButtons from "../socials_users/SocializeButtons";
import AvatarProfile from "../images/AvatarProfile";

const InfoOf = ({
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
      <div className="flex items-start gap-8 my-2 p-4">
        <AvatarProfile avatar={avatar} userID={profile._id} />
        <div className="font-ubuntu-500 flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <p className="text-white text-2xl">
              {profile.first_name} {profile.last_name}
            </p>
            {!isSame && <SocializeButtons user={profile} />}
            {!editContext.showEdit && isSame && <UploadButtonToggle />}
          </div>
          <StatsOf profile={profile} />
          <p className="text-white font-open">{profile.bio} </p>
        </div>
      </div>
    </div>
  );
};
export default InfoOf;

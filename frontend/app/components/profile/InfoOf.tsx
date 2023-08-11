import { User } from "@/app/utils/__types__/types";
import { UserContext } from "@/app/context/userContext";
import { useContext, useEffect, useState } from "react";

import { EditContext } from "@/app/context/editContext";
import AvatarPost from "../images/AvatarPost";
import UploadButtonToggle from "../toggles/UploadButtonToggle";
import UpdateProfileModal from "../modals/UpdateProfileModal";
import StatsOf from "./StatsOf";
import SocializeButtons from "../socials_users/SocializeButtons";

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
      <div className="flex items-center justify-start gap-3">
        <AvatarPost avatar={avatar} userID={profile._id} />
        <div className="text-xl font-ubuntu-500 flex gap-1">
          {profile.first_name} {profile.last_name}
        </div>
        {!editContext.showEdit && isSame && <UploadButtonToggle />}
        {editContext.showEdit && <UpdateProfileModal profile={profile} />}
        {!isSame && <SocializeButtons user={profile} />}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-white2 text-center">{profile.bio} </p>
        <StatsOf profile={profile} />
      </div>
    </div>
  );
};
export default InfoOf;

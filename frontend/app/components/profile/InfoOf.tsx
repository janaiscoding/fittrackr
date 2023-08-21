import { User } from "@/app/utils/types";
import { UserContext } from "@/app/context/userContext";
import { useContext, useEffect, useState } from "react";

import { EditContext } from "@/app/context/editContext";
import SocializeButtons from "../socials_users/SocializeButtons";
import AvatarProfile from "../images/AvatarProfile";
import EditButton from "../toggles/EditButton";
import Settings from "@/app/settings/page";
import WheelSVG from "@/app/utils/assets/svgs/Settings";

const InfoOf = ({
  profile,
  isSame,
}: {
  profile: User;
  isSame: boolean | undefined;
}) => {

  const [avatar, setAvatar] = useState(profile.avatar);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.user?._id === profile._id) {
      setAvatar(userContext.user.avatar);
    }
  }, [userContext, profile]);

  return (
    <div className="flex items-start gap-8 my-2 px-4">
      <AvatarProfile avatar={avatar} userID={profile._id} isSame={isSame} />
      <div className="font-ubuntu-500 flex flex-col gap-1">
        <div className="flex flex-col gap-1 items-start md:items-center md:flex-row">
          <p className="flex items-center gap-2 text-white text-xl">
            {profile.first_name} {profile.last_name} {isSame && <WheelSVG />}
          </p>
          {!isSame && <SocializeButtons user={profile} />}
          {/* {!editContext.showEdit && isSame && <EditButton />} */}
        </div>
        <p className="text-softWhite font-open">{profile.bio} </p>
      </div>
    </div>
  );
};

export default InfoOf;

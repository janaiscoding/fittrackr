import { UserContext } from "@/app/context/userContext";
import { useContext, useEffect, useState } from "react";

import { EditContext } from "@/app/context/editContext";
import SocializeButtons from "../socials_users/SocializeButtons";
import AvatarProfile from "../images/AvatarProfile";
import EditButton from "../toggles/EditButton";
import { User } from "@/app/utils/types";
import EditUserModal from "../modals/EditUserModal";
import AvatarBanner from "../images/AvatarBanner";

const UserInfo = ({
  profile,
  isSame,
}: {
  profile: User;
  isSame: boolean | undefined;
}) => {
  const [avatar, setAvatar] = useState(profile.avatar);
  const [banner, setBanner] = useState(profile.banner);

  const userContext = useContext(UserContext);
  const editContext = useContext(EditContext);

  useEffect(() => {
    //This handles context changes when the user will change the avatar or banner
    if (userContext.user && isSame) {
      setAvatar(userContext.user.avatar);
      setBanner(userContext.user.banner)
    }
  }, [isSame, userContext]);

  return (
    <div className="flex flex-col items-center gap-3 my-2">
      {banner && <AvatarBanner banner={banner} isSame={isSame} />}
      <div className="flex items-center gap-3 basis-full w-full">
        {avatar && <AvatarProfile avatar={avatar} isSame={isSame} />}
        <div className="font-ubuntu-500 flex items-start justify-between w-full gap-1">
          <div className="flex flex-col gap-1 items-start">
            <p className="flex items-center gap-2 text-black dark:text-white text-xl md:text-3xl">
              {profile.first_name} {profile.last_name}
            </p>
            <p className="text-secondary dark:text-gray-400 font-open hidden md:block break-words max-w-md">
              {profile.bio}
            </p>
          </div>
          <div>
            {!isSame && <SocializeButtons user={profile} />}
            {!editContext.showEdit && isSame && <EditButton />}
          </div>
        </div>

        {editContext.showEdit && <EditUserModal />}
      </div>
    </div>
  );
};

export default UserInfo;

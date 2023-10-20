import { UserContext } from "@/app/context/userContext";
import { useContext, useEffect, useState } from "react";

import { EditContext } from "@/app/context/editContext";
import SocializeButtons from "../socials_users/SocializeButtons";
import AvatarProfile from "../images/AvatarProfile";
import EditButton from "../toggles/EditButton";
import { User } from "@/app/utils/types";
import EditModal from "../modals/EditModal";

const UserInfo = ({
  profile,
  isSame,
}: {
  profile: User;
  isSame: boolean | undefined;
}) => {
  const [avatar, setAvatar] = useState(profile.avatar);
  const userContext = useContext(UserContext);
  const editContext = useContext(EditContext);

  useEffect(() => {
    if (userContext.user?._id === profile._id) {
      setAvatar(userContext.user.avatar);
    }
  }, [userContext, profile]);

  return (
    <div className="flex items-center gap-3 my-2 px-4">
      <AvatarProfile avatar={avatar} userID={profile._id} isSame={isSame} />
      <div className="font-ubuntu-500 flex items-start justify-between w-full gap-1">
        <div className="flex flex-col gap-1 items-start">
          <p className="flex items-center gap-2 text-black text-xl md:text-3xl">
            {profile.first_name} {profile.last_name}
          </p>
          <p className="text-secondary font-open">{profile.bio} </p>
        </div>
        <div>
          {!isSame && <SocializeButtons user={profile} />}
          {!editContext.showEdit && isSame && <EditButton />}
        </div>
      </div>
      {editContext.showEdit && <EditModal />}
    </div>
  );
};

export default UserInfo;

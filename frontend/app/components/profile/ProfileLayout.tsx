import { User } from "@/app/utils/__types__/types";
import ContentOf from "./ContentOf";
import InfoOf from "./InfoOf";
import { useContext } from "react";
import { EditContext } from "@/app/context/editContext";
import UpdateProfileModal from "../modals/UpdateProfileModal";

const ProfileLayout = ({
  profile,
  isSame,
}: {
  profile: User;
  isSame: boolean | undefined;
}) => {
  const editContext = useContext(EditContext)
  return (
    <div className="flex flex-col">
      <InfoOf profile={profile} isSame={isSame} />
      <ContentOf profile={profile} />
      {editContext.showEdit && <UpdateProfileModal profile={profile} />}
    </div>
  );
};

export default ProfileLayout;

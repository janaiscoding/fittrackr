import { User } from "@/app/utils/__types__/types";
import ContentOf from "./ContentOf"
import InfoOf from "./InfoOf";

const ProfileLayout = ({
  profile,
  isSame,
}: {
  profile: User;
  isSame: boolean | undefined;
}) => {
  return (
    <>
      <div className="flex flex-col font-ubuntu w-full">
        <InfoOf profile={profile} isSame={isSame} />
      </div>
      <ContentOf profile={profile} />
    </>
  );
};

export default ProfileLayout;

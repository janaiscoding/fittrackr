import { ImageType } from "@/app/utils/types";
import { CldImage } from "next-cloudinary";

type AvatarProps = {
  avatar: ImageType;
  userID: string;
};

//Used in desktop views in community sidebar
const SidebarAvatar = ({ avatar, userID }: AvatarProps) => {
  return (
    <a href={`/users/${userID}`}>
      <CldImage
        src={avatar.url}
        width={200}
        height={200}
        className="w-12 h-12 rounded-full object-cover sidebar-avatar-image"
        alt={avatar.alt}
        id="currentUserAvatar"
      />
    </a>
  );
};

export default SidebarAvatar;

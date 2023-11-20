import { ImageType } from "@/app/utils/types";
import { CldImage } from "next-cloudinary";

//Used in desktop views in community sidebar
const SidebarAvatar = ({ avatar }: { avatar: ImageType }) => {
  return (
    <CldImage
      src={avatar.url}
      width={400}
      height={400}
      className="w-12 h-12 rounded-full object-cover sidebar-avatar"
      alt={avatar.alt}
      id="currentUserAvatar"
    />
  );
};

export default SidebarAvatar;

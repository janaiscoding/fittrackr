import { ImageType } from "@/app/utils/types";
import Image from "next/image";
import defaultPic from "../../../public/assets/default_avatar.jpg";
import { CldImage } from "next-cloudinary";
type AvatarProps = {
  avatar: ImageType;
  userID: string;
};
const SidebarAvatar = ({ avatar, userID }: AvatarProps) => {
  return (
    <a href={`/users/${userID}`}>
      {avatar !== undefined ? (
        <CldImage
          src={avatar.url}
          width={200}
          height={200}
          className="w-12 h-12 rounded-full object-cover sidebar-avatar-image"
          alt={avatar.alt}
        />
      ) : (
        <Image
          src={defaultPic}
          className="w-12 h-12 rounded-full object-cover sidebar-avatar-image"
          alt="user-default-profile-picture"
        />
      )}
    </a>
  );
};

export default SidebarAvatar;

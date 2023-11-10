import { ImageType } from "@/app/utils/types";
import { CldImage } from "next-cloudinary";
type AvatarProps = {
  avatar: ImageType;
  userID: string;
};
const AvatarCommunity = ({ avatar, userID }: AvatarProps) => {
  return (
    <a href={`/users/${userID}`}>
        <CldImage
          src={avatar.url}
          width={200}
          height={200}
          className="w-12 h-12 rounded-full object-cover"
          alt={avatar.alt}
        />
    </a>
  );
};

export default AvatarCommunity;

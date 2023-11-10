import { ImageType } from "@/app/utils/types";
import { CldImage } from "next-cloudinary";

//USED in: comments AND also top navigation bar on mobile
const AvatarComment = ({
  avatar,
  userID,
}: {
  avatar: ImageType;
  userID: string;
}) => {

  return (
    <a href={`/users/${userID}`}>
      <CldImage
        src={avatar.url}
        className="rounded-full object-cover comment-image"
        alt={avatar.alt}
        width={80}
        height={80}
      />
    </a>
  );
};

export default AvatarComment;

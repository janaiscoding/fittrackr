import { ImageType } from "@/app/utils/types";
import { CldImage } from "next-cloudinary";

const PostImage = ({ image }: { image: ImageType }) => {
  return (
    <CldImage
      src={image.url}
      width={400}
      height={400}
      className="w-full h-60 object-cover border-2 border-solid border-outline"
      alt={image.alt}
    />
  );
};

export default PostImage;

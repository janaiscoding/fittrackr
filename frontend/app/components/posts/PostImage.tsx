import { ImageType } from "@/app/utils/types";
import { CldImage } from "next-cloudinary";

const PostImage = ({ image }: { image: ImageType }) => {
  return (
    <CldImage
      src={image.url}
      width={700}
      height={700}
      className="object-cover w-full h-full"
      alt={image.alt}
    />
  );
};

export default PostImage;

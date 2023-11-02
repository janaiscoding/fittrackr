import { ImageType } from "@/app/utils/types";
import { CldImage } from "next-cloudinary";

const PostImage = ({ image }: { image: ImageType }) => {
  return (
    <div>
      <CldImage
        src={image.url}
        width={600}
        height={600}
        className="object-cover"
        alt={image.alt}
      />
    </div>
  );
};

export default PostImage;

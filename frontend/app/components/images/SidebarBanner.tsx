import { ImageType } from "@/app/utils/types";
import { CldImage } from "next-cloudinary";

const SidebarBanner = ({ banner }: { banner: ImageType }) => {
  return (
    <CldImage
      src={banner.url}
      width={400}
      height={400}
      className="object-cover h-20"
      alt={banner.alt}
      id="currentUserBanner"
    />
  );
};

export default SidebarBanner;

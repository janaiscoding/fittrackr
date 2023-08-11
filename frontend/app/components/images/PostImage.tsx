import { Avatar } from "@/app/utils/__types__/types";
import Image from "next/image";

const PostImage = ({ image }: { image: Avatar }) => {
  return (
    <div>
      <Image
        src={`data:${image.contentType};base64,${Buffer.from(
          image.data!
        ).toString("base64")}`}
        width={400}
        height={0}
        className="w-full h-60 object-cover border-2 border-solid border-mid-green"
        alt="Uploaded Post Picture"
      />
    </div>
  );
};

export default PostImage;

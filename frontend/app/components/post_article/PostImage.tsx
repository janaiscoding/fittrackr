import { Avatar, ShortUser } from "@/app/__types__/types";
import Image from "next/image";

const PostImage = ({ user, image }: { user: ShortUser; image: Avatar }) => {
  return (
    image !== undefined && (
      <Image
        src={`data:${image.contentType};base64,${Buffer.from(
          image.data!
        ).toString("base64")}`}
        width={400}
        height={0}
        className="w-full h-60 object-cover border-2 border-solid border-mid-green md:h-auto"
        alt={`Post pic, uploaded by ${user.first_name} ${user.last_name}`}
      />
    )
  );
};

export default PostImage;

import { User } from "@/app/utils/types";
import { CldImage } from "next-cloudinary";
import SidebarBanner from "../images/SidebarBanner";

const UserWrapperWithPosts = ({
  currentUser,
}: {
  currentUser: User;
}) => {
  return (
    <div className="relative bg-secondary/10 dark:bg-zinc-950/20 flex items-center flex-col gap-1 basis-full">
      <SidebarBanner banner={currentUser.banner} />
      <div className="absolute bg-neutral-950/70 flex gap-2 items-center w-full h-full justify-center">
        <a
          href={`/users/${currentUser._id}`}
          aria-label={`Click to go to the profile of ${
            currentUser.first_name + currentUser.last_name
          }`}
        >
          <CldImage
            src={currentUser.avatar.url}
            width={400}
            height={400}
            className="w-12 h-12 rounded-full object-cover sidebar-avatar border border-white/20 hover:border-white/50"
            alt={currentUser.avatar.alt}
            id="currentUserAvatar"
          />
        </a>
        <div className="flex flex-col items-start justify-start">
          <a
            href={`/users/${currentUser._id}`}
            className="text-white font-ubuntu-500 text-2xl text-center hover:text-accent dark:hover:text-accent"
            aria-label={`Click to go to the profile of ${
              currentUser.first_name + currentUser.last_name
            }`}
          >
            {currentUser.first_name} {currentUser.last_name}
          </a>
          <div className="text-sm flex gap-1 text-white">
            {" "}
            <p>
              <span className="text-accent">{currentUser.posts.length}</span>{" "}
              {currentUser.posts.length === 1 ? "Post" : "Posts"}
            </p>
            <p>
              <span className="text-accent">{currentUser.friends.length}</span>{" "}
              {currentUser.friends.length === 1 ? "Friend" : "Friends"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWrapperWithPosts;

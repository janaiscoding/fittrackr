import { User } from "@/app/utils/types";
import { CldImage } from "next-cloudinary";
import SidebarBanner from "../images/SidebarBanner";

const UserWrapperNoPosts = ({ currentUser }: { currentUser: User }) => {
  return (
    <div className="relative bg-secondary/10 dark:bg-zinc-950/20 flex items-center flex-col gap-1 basis-full">
      <SidebarBanner banner={currentUser.banner} />
      <div className="absolute bg-slate-950/80 flex gap-2 items-center w-full h-full justify-center">
        <CldImage
          src={currentUser.avatar.url}
          width={400}
          height={400}
          className="w-12 h-12 rounded-full object-cover sidebar-avatar border border-white/20 hover:border-white/50"
          alt={currentUser.avatar.alt}
          id="currentUserAvatar"
        />
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
        </div>
      </div>
    </div>
  );
};

export default UserWrapperNoPosts;

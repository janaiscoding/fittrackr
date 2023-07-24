"use client";
import { removeJwtToken } from "@/app/api/auth_handler";
import Community from "@/app/assets/svgs/Community";
import Dumbbell from "@/app/assets/svgs/Dumbbell";
import Plus from "@/app/assets/svgs/Plus";
import SignOut from "@/app/assets/svgs/SignOut";
import User from "@/app/assets/svgs/User";
import { UserContext } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const BotNav = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const handleSignout = () => {
    console.log("logoff");
    userContext.setUser(null);
    removeJwtToken();
    router.push("/login");
  };
  return (
    <div className="flex justify-between relative items-center py-3 px-4 bg-black shadow-sm border-solid border-t border-secondary-green ">
      <div className="flex gap-6">
        <a
          href={`/users/${userContext.user?._id}`}
          className="flex flex-col gap-1 items-center"
        >
          <User />
          <p className="text-xs text-grey">Profile</p>
        </a>
        <a
          href={`/users/${userContext.user?._id}/workouts`}
          className="flex flex-col gap-1 items-center"
        >
          <Dumbbell />
          <p className="text-xs text-grey">Workouts</p>
        </a>
      </div>
      <button className="absolute top-[-54%] left-[37%]">
        <Plus />
      </button>
      <div className="flex gap-6">
        <a href={`/users`} className="flex flex-col gap-1 items-center">
          <Community />
          <p className="text-xs text-grey">Community</p>
        </a>
        <div
          className="flex flex-col gap-1 items-center"
          onClick={handleSignout}
        >
          <SignOut />
          <p className="text-xs text-grey">Sign Out</p>
        </div>
      </div>
    </div>
  );
};

export default BotNav;

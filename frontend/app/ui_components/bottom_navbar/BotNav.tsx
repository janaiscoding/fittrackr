"use client";
import { removeJwtToken } from "@/app/api/auth_handler";
import Community from "@/app/assets/svgs/Community";
import Dumbbell from "@/app/assets/svgs/Dumbbell";
import Plus from "@/app/assets/svgs/Plus";
import SignOut from "@/app/assets/svgs/SignOut";
import User from "@/app/assets/svgs/User";
import { UserContext } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import { SetStateAction, useContext, useState } from "react";

type BotNavProps = {
  isShown: boolean;
  setShown: React.Dispatch<SetStateAction<boolean>>;
};

const BotNav = ({ isShown, setShown }: BotNavProps) => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const handleSignout = () => {
    userContext.setUser(null);
    removeJwtToken();
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 bg-black shadow-sm border-solid border-t border-secondary-green">
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

      <button
        className="scale-150 -translate-y-2/4"
        onClick={() => {
          setShown(!isShown);
          console.log(isShown);
        }}
      >
        <Plus />
        {/* gotta fix svg background here */}
      </button>
      <a href={`/users`} className="flex flex-col gap-1 items-center">
        <Community />
        <p className="text-xs text-grey">Community</p>
      </a>
      <div className="flex flex-col gap-1 items-center" onClick={handleSignout}>
        <SignOut />
        <p className="text-xs text-grey">Sign Out</p>
      </div>
    </div>
  );
};

export default BotNav;

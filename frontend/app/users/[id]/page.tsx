/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import TopNav from "@/app/components/top_navbar/TopNav";
import BotNav from "@/app/components/bottom_navbar/BotNav";
import { useContext, useEffect, useState } from "react";
import useTokenVerification from "@/app/hooks/useTokenVerification";
import { ModalContext } from "@/app/context/modalContext";
import FormModal from "@/app/components/forms/FormModal";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import getProfile from "@/app/api/users/get_profile";
import { User } from "@/app/__types__/types";
import Loader from "@/app/assets/Loader";
import TabToggle from "@/app/main_page/middle_column/TabToggle";
import PostFormMD from "@/app/components/forms/PostFormMD";
import Stats from "./Stats";
import { ViewContext } from "@/app/context/viewContext";
import UserData from "./UserData";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  useTokenVerification();

  const [profile, setProfile] = useState<User>({} as User);

  const [isLoading, setIsLoading] = useState(true);
  const [isSame, setIsSame] = useState<boolean>();

  const modalContext = useContext(ModalContext);
  const viewContext = useContext(ViewContext);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    getProfile(id, setProfile);
    console.log("get profile");
  }, []);

  useEffect(() => {
    if (profile) {
      setIsLoading(Object.keys(profile).length === 0);
      setIsSame(currentUser._id === profile._id);
    }
  }, [profile]);
  console.log(isLoading)
  return (
    <div className="min-h-screen flex flex-col justify-between w-full">
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex flex-col p-2 w-full">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col font-ubuntu w-full">
            <UserData profile={profile} isSame={isSame} />
            <Stats profile={profile} />
          </div>
        )}
        {!isLoading && (
          <div>
            <TabToggle />
            {viewContext.current === "feed" && isSame && <PostFormMD />}
            {viewContext.current === "workouts" && isSame && <PostFormMD />}
            {modalContext.modalPost && <FormModal />}
          </div>
        )}
      </div>

      <BotNav />
    </div>
  );
};

export default Page;

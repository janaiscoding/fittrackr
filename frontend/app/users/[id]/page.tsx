/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import TopNav from "@/app/components/top_navbar/TopNav";
import BotNav from "@/app/components/bottom_navbar/BotNav";
import { useContext, useEffect, useState } from "react";
import useTokenVerification from "@/app/hooks/useTokenVerification";
import { ModalContext } from "@/app/context/modalContext";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import getProfile from "@/app/utils/api/users/get_profile";
import { User } from "@/app/utils/__types__/types";
import Loader from "@/app/utils/assets/Loader";
import ProfileLayout from "../../components/profile/ProfileLayout";
import FormModal from "@/app/components/modals/FormModal";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  useTokenVerification();
  const modalContext = useContext(ModalContext);
  const { currentUser } = useCurrentUser();

  const [profile, setProfile] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);
  const [isSame, setIsSame] = useState<boolean>();

  useEffect(() => {
    getProfile(id, setProfile);
  }, []);

  useEffect(() => {
    if (profile) {
      setIsLoading(Object.keys(profile).length === 0);
      setIsSame(currentUser._id === profile._id);
    }
  }, [profile, currentUser]);

  return (
    <div className="min-h-screen flex flex-col justify-between w-full">
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex justify-between items-start gap-2 p-2">
        <p>Left?</p>
        {isLoading ? (
          <Loader />
        ) : (
          <ProfileLayout profile={profile} isSame={isSame} />
        )}
        <p>Right?</p>
      </div>
      {modalContext.modalPost && <FormModal />}
      <BotNav />
    </div>
  );
};

export default Page;

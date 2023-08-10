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
import PostFormMD from "@/app/components/forms/PostFormMD";
import { ViewContext } from "@/app/context/viewContext";
import UserData from "../../components/user/UserData";
import UserTabToggle from "../../components/user/UserTabToggle";
import UserFriends from "../../components/user/UserFriends";
import { PostsContext } from "@/app/context/postsContext";
import useLoadingPosts from "@/app/hooks/useLoadingPosts";
import PostArticle from "@/app/components/post_article/PostArticle";
import UserPosts from "./UserPosts";

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
      <div className="max-w-7xl m-auto min-h-[90vh] flex flex-col p-2 w-full">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col font-ubuntu w-full">
              <UserData profile={profile} isSame={isSame} />
            </div>
            <div>
              <UserTabToggle />
              {viewContext.current === "feed" && (
                <UserPosts userID={profile._id} isSame={isSame}/>
              )}

              {isSame && viewContext.current === "workouts" && (
                <p>post a new workout</p>
              )}
              {viewContext.current === "workouts" && <p>Work in progress</p>}
              {viewContext.current === "friends" && (
                <UserFriends userID={profile._id} />
              )}
              {modalContext.modalPost && <FormModal />}
            </div>
          </>
        )}
      </div>

      <BotNav />
    </div>
  );
};

export default Page;

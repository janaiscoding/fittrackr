/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect } from "react";
import useTokenVerification from "@/app/hooks/useTokenVerification";
import { ModalContext } from "@/app/context/modalContext";
import ProfileLayout from "../../components/profile/ProfileLayout";
import FormModal from "@/app/components/modals/FormModal";
import getPosts from "@/app/utils/api/posts/get_posts";
import { PostsContext } from "@/app/context/postsContext";
import TopNav from "@/app/components/navigation/TopNav";
import BotNav from "@/app/components/navigation/BotNav";
import Sidebar from "@/app/components/homepage_layout/left_column/Sidebar";
import Social from "@/app/components/homepage_layout/right_column/Social";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  useTokenVerification();
  const modalContext = useContext(ModalContext);
  const postsContext = useContext(PostsContext);

  useEffect(() => {
    //Initialize posts context.
    // This is just initial setter for the context. Happens on every page initial load.
    getPosts(postsContext.setPosts);
  }, []);

  return (
    <div className="bg-black">
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex justify-between items-start gap-2 p-2">
        <Sidebar />
        <ProfileLayout id={id} />
        <Social />
        {modalContext.modalPost && <FormModal />}
      </div>
      <BotNav />
    </div>
  );
};

export default Page;

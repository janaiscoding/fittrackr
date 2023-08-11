/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import TopNav from "@/app/components/top_navbar/TopNav";
import BotNav from "@/app/components/bottom_navbar/BotNav";
import { useContext, useEffect } from "react";
import useTokenVerification from "@/app/hooks/useTokenVerification";
import { ModalContext } from "@/app/context/modalContext";
import ProfileLayout from "../../components/profile/ProfileLayout";
import FormModal from "@/app/components/modals/FormModal";
import getPosts from "@/app/utils/api/posts/get_posts";
import { PostsContext } from "@/app/context/postsContext";

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
    <div className="min-h-screen flex flex-col justify-between w-full">
      <TopNav />
      <div className="max-w-7xl m-auto min-h-[90vh] flex justify-between items-start gap-2 p-2">
        <p>Left?</p>
        <ProfileLayout id={id} />
        <p>Right?</p>
      </div>
      {modalContext.modalPost && <FormModal />}
      <BotNav />
    </div>
  );
};

export default Page;

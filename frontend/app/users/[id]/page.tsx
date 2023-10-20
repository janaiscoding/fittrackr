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
    <div>
      <TopNav />
      <ProfileLayout id={id} />
      {modalContext.modalPost && <FormModal />}
      <BotNav />
    </div>
  );
};

export default Page;

/* eslint-disable react-hooks/exhaustive-deps */
import PostArticle from "../components/post_article/PostArticle";
import PostFormMD from "../components/forms/PostFormMD";
import useLoadingPosts from "../hooks/useLoadingPosts";
import Loader from "../assets/Loader";
import { PostsContext } from "../context/postsContext";
import { useContext, useEffect, useState } from "react";
import getPosts from "../api/posts/get_posts";
import { ModalContext } from "../context/modalContext";
import FormModal from "../components/forms/FormModal";
import { ViewContext } from "../context/viewContext";
import FeedView from "./FeedView";
import TabToggle from "./TabToggle";

const AppData = () => {
  // Checks which tab is open on the homepage: Feed or Workouts.
  const viewContext = useContext(ViewContext);
  // Handles mobile create a new post form modal.
  const modalContext = useContext(ModalContext);

  // Fetch posts on load
  const postsContext = useContext(PostsContext);
  useEffect(() => {
    getPosts(postsContext.setPosts);
  }, []);

  return (
    <div className="flex flex-col font-ubuntu mb-10 w-full ">
      <TabToggle />
      {viewContext.current === "feed" && <FeedView />}
      {viewContext.current === "workouts" && <p>workouts</p>}
      {modalContext.modal && <FormModal />}
    </div>
  );
};

export default AppData;

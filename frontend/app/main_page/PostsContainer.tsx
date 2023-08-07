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

const PostsContainer = () => {
  const viewContext = useContext(ViewContext);
  const showFeed = () => {
    viewContext.setViewWorkouts(false);
    viewContext.setViewFeed(true);
  };
  const showWorkouts = () => {
    viewContext.setViewWorkouts(true);
    viewContext.setViewFeed(false);
  };
  const isLoadingPosts = useLoadingPosts();
  const postsContext = useContext(PostsContext);
  // Handles mobile create a new post form modal.
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    getPosts(postsContext.setPosts);
  }, []);

  return (
    <div className="flex flex-col font-ubuntu gap-6 mb-10 w-full ">
      <div className="flex justify-evenly text-2xl font-ubuntu-500 ">
        <button
          className={`py-2 basis-full text-center hover:bg-blue ${
            viewContext.viewFeed && "border-b border-yellow2"
          }`}
          onClick={showFeed}
        >
          Feed
        </button>
        <button
          className={`py-2 basis-full text-center hover:bg-blue ${
            viewContext.viewWorkouts && "border-b border-yellow2"
          }`}
          onClick={showWorkouts}
        >
          Workouts
        </button>
      </div>
      {viewContext.viewFeed && (
        <>
          <PostFormMD />
          {isLoadingPosts && <Loader />}
          <div className="flex flex-col font-ubuntu gap-6 w-full h-full">
            {postsContext.posts?.map((post, i) => (
              <PostArticle key={i} post={post} />
            ))}
          </div>
        </>
      )}
      {viewContext.viewWorkouts && <p>workouts</p>}
      {modalContext.modal && <FormModal />}
    </div>
  );
};

export default PostsContainer;

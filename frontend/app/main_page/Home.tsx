/* eslint-disable react-hooks/exhaustive-deps */
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import getPosts from "../api/posts/get_posts";
import PostArticle from "../components/post_article/PostArticle";
import { PostsContext } from "../context/postsContext";
import SendSVG from "../assets/svgs/SendSVG";
import UploadSVG from "../assets/svgs/Upload";
import PostFormMD from "../components/forms/PostFormMD";

const Home = () => {
  const postsContext = useContext(PostsContext);

  useEffect(() => {
    getPosts(postsContext.setPosts);
  }, []);

  return (
    <div className="min-h-[90vh] md:px-20 flex md:justify-between justify-center items-start gap-2 py-10">
      <div className="hidden md:block">left side</div>
      {postsContext.posts?.length === 0 ? (
        "Loading animation"
      ) : (
        <div className="flex flex-col font-ubuntu gap-6 mb-10">
          <PostFormMD />
          {postsContext.posts?.map((post, i) => (
            <PostArticle key={i} post={post} />
          ))}
        </div>
      )}

      <div className="hidden md:block">right side</div>
    </div>
  );
};

export default Home;

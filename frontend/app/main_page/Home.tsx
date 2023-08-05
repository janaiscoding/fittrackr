/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import getPosts from "../api/posts/get_posts";
import PostArticle from "../components/post_article/PostArticle";
import { PostsContext } from "../context/postsContext";
import PostFormMD from "../components/forms/PostFormMD";
import LeftContainer from "./LeftContainer";

const Home = () => {
  const postsContext = useContext(PostsContext);

  useEffect(() => {
    getPosts(postsContext.setPosts);
  }, []);

  return (
    <div className="min-h-[90vh] md:px-20 flex md:justify-between justify-center items-start gap-2 py-4">
      <LeftContainer />
      <div className="flex flex-col font-ubuntu gap-6 mb-10 w-full md:w-1/2 md:max-w-lg">
        <PostFormMD />
        {postsContext.posts?.length === 0 ? (
          "Loading animation for posts container"
        ) : (
          <div className="flex flex-col font-ubuntu gap-6">
            {postsContext.posts?.map((post, i) => (
              <PostArticle key={i} post={post} />
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:block">right side</div>
    </div>
  );
};

export default Home;

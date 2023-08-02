/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import getPosts from "../api/posts/get_posts";
import PostArticle from "../components/post_article/PostArticle";
import { PostsContext } from "../context/postsContext";

const Home = () => {
  const postsContext = useContext(PostsContext);

  useEffect(() => {
    getPosts(postsContext.setPosts);

  }, []);

  return (
    <div className="min-h-[90vh] md:px-20 flex md:justify-between justify-center items-start gap-2">
      <div className="hidden md:block">left side</div>
      <div className="flex flex-col gap-6 bg-black mb-10">
        <h1 className="ml-4">Create a new post</h1>
        <h1 className="ml-4 text-2xl font-ubuntu-500 self-start border-b-2 border-yellow2">
          Feed..
        </h1>
        {postsContext.posts?.length === 0 && "Loading animation"}
        {postsContext.posts?.map((post, i) => (
          <PostArticle key={i} post={post} />
        ))}
      </div>
      <div className="hidden md:block">right side</div>
    </div>
  );
};

export default Home;

/* eslint-disable react-hooks/exhaustive-deps */
import PostArticle from "../components/post_article/PostArticle";
import PostFormMD from "../components/forms/PostFormMD";
import useLoadingPosts from "../hooks/useLoadingPosts";
import Loader from "../assets/Loader";
import { PostsContext } from "../context/postsContext";
import { useContext, useEffect } from "react";
import getPosts from "../api/posts/get_posts";

const PostsContainer = () => {
  const isLoadingPosts = useLoadingPosts();
  const postsContext = useContext(PostsContext);

  useEffect(() => {
    getPosts(postsContext.setPosts);
  }, []);

  return (
    <div className="flex flex-col font-ubuntu gap-6 mb-10 w-full md:w-1/2 md:max-w-lg">
      <PostFormMD />
      {isLoadingPosts && <Loader />}
      <div className="flex flex-col font-ubuntu gap-6 w-full h-full">
        {postsContext.posts?.map((post, i) => (
          <PostArticle key={i} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsContainer;

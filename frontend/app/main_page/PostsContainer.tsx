/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import getPosts from "../api/posts/get_posts";
import PostArticle from "../components/post_article/PostArticle";
import { PostsContext } from "../context/postsContext";
import PostFormMD from "../components/forms/PostFormMD";
import useLoadingPosts from "../hooks/useLoadingPosts";

const PostsContainer = () => {
  const postsContext = useContext(PostsContext);
  const isLoadingPosts = useLoadingPosts();

  useEffect(() => {
    getPosts(postsContext.setPosts);
  }, []);

  return (
    <div className="flex flex-col font-ubuntu gap-6 mb-10 w-full md:w-1/2 md:max-w-lg">
      <PostFormMD />
      {isLoadingPosts ? (
        "Loading animation for posts container"
      ) : (
        <div className="flex flex-col font-ubuntu gap-6">
          {postsContext.posts?.map((post, i) => (
            <PostArticle key={i} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsContainer;

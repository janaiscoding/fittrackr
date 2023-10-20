/* eslint-disable react-hooks/exhaustive-deps */
import { PostsContext } from "../../../context/postsContext";
import { useContext, useEffect, useState } from "react";
import getPosts from "../../../utils/api/posts/get_posts";
import PostFormMD from "../../forms/PostFormMD";
import Loader from "@/app/utils/assets/Loader";
import PostArticle from "../../posts/PostArticle";

const AppData = () => {
  // Fetch posts on load
  const postsContext = useContext(PostsContext);
  // Toggles a loader CSS effect while the posts are being fetched.
  // const isLoadingPosts = useLoadingPosts();
  const [isLoadingPosts, setIsLoading] = useState(true);

  useEffect(() => {
    getPosts(postsContext.setPosts, () => {
      setIsLoading(false);
    });
    // Don't need to fetch all over again, that happens on the mapping process.
    // This is just initial setter for the context. Happens on every page.
  }, []);
  return (
    <div className="flex flex-col font-ubuntu mb-10 w-full text-secondary">
      <PostFormMD />
      {isLoadingPosts && <Loader />}
      {!isLoadingPosts && postsContext.posts?.length === 0 && (
        <p className="w-full self-center text-secondary bg-bgContainers p-2">
          This section is quiet for now..
        </p>
      )}
      <div className="mt-4 flex flex-col font-ubuntu gap-4 w-full h-full">
        {postsContext.posts?.map((post, i) => (
          <PostArticle key={i} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AppData;

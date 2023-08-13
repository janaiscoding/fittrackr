import { useContext } from "react";
import PostFormMD from "../../forms/PostFormMD";
import useLoadingPosts from "../../../hooks/useLoadingPosts";
import { PostsContext } from "../../../context/postsContext";
import PostArticle from "../../posts/PostArticle";
import Loader from "../../../utils/assets/Loader";

const FeedView = () => {
  // Toggles a loader CSS effect while the posts are being fetched.
  const isLoadingPosts = useLoadingPosts();

  const postsContext = useContext(PostsContext);

  return (
    <>
      <PostFormMD />
      {isLoadingPosts && <Loader />}
      {!isLoadingPosts && postsContext.posts?.length === 0 && (
        <p className="w-full self-center text-white2 bg-bgContainers p-2 rounded mt-2">
          This section is quiet...
        </p>
      )}
      <div className="mt-4 flex flex-col font-ubuntu gap-4 w-full h-full">
        {postsContext.posts?.map((post, i) => (
          <PostArticle key={i} post={post} />
        ))}
      </div>
    </>
  );
};

export default FeedView;

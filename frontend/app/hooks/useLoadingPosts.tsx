import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../context/postsContext";

// Will determine if the postsContext has loaded or not. Sets isLoading = false when posts object is filled.
const useLoadingPosts = () => {
  const [isLoadingPosts, setLoadingPosts] = useState<boolean>(true);
  const postsContext = useContext(PostsContext);

  useEffect(() => {
    if (postsContext.posts) {
      setLoadingPosts(false);
    }
  }, [postsContext]);

  return isLoadingPosts;
};

export default useLoadingPosts;

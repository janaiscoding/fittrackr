import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../context/postsContext";

// Will determine if the postsContext has loaded or not. Sets isLoading = false when posts object is filled.
const useLoadingPosts = () => {
  const [isLoadingPosts, setLoadingPosts] = useState<boolean>();
  const postsContext = useContext(PostsContext);

  useEffect(() => {
    if (postsContext.posts) {
      setLoadingPosts(Object.keys(postsContext.posts).length === 0); //O(n) complexity
    }
  }, [postsContext.posts]);
  return isLoadingPosts;
};

export default useLoadingPosts;

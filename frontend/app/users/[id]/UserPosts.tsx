import { useContext, useEffect, useState } from "react";
import PostFormMD from "../../components/forms/PostFormMD";
import useLoadingPosts from "../../hooks/useLoadingPosts";
import { PostsContext } from "../../context/postsContext";
import PostArticle from "../../components/post_article/PostArticle";
import Loader from "../../assets/Loader";
import getPosts from "@/app/api/posts/get_posts";
import { Post } from "@/app/__types__/types";

const UserPosts = ({
  userID,
  isSame,
}: {
  userID: string;
  isSame: boolean | undefined;
}) => {
  const isLoadingPosts = useLoadingPosts();
  const postsContext = useContext(PostsContext);
  const [userPosts, setUserPosts] = useState<Post[]>([] as Post[]);

  useEffect(() => {
    getPosts(postsContext.setPosts);
    // Don't need to fetch all over again, that happens on the mapping process. This is just initial setter for the context. Happens on every page.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (postsContext.posts) {
      setUserPosts(
        postsContext.posts.filter((post) => post.user._id === userID)
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsContext]);

  return (
    <>
      {isSame && <PostFormMD />}
      {isLoadingPosts && <Loader />}

      <div className="mt-4 flex flex-col font-ubuntu gap-4 w-full h-full">
        {userPosts.map((post, i) => (
          <PostArticle key={i} post={post} />
        ))}
      </div>
    </>
  );
};

export default UserPosts;

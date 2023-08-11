
import getPosts from "@/app/utils/api/posts/get_posts";
import { Post } from "@/app/utils/__types__/types";
import useLoadingPosts from "@/app/hooks/useLoadingPosts";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "@/app/context/postsContext";
import Loader from "@/app/utils/assets/Loader";
import PostArticle from "../../posts/PostArticle";

const PostsOf = ({ userID }: { userID: string }) => {
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
  }, [postsContext, userID]);

  return (
    <>
      {isLoadingPosts && <Loader />}
      {!isLoadingPosts && userPosts.length === 0 && (
        <p className="w-full self-center text-white2 bg-blue p-2 rounded mt-2">
          This user doesn&apos;t have any posts yet.
        </p>
      )}
      <div className="mt-4 flex flex-col font-ubuntu gap-4 w-full h-full">
        {userPosts.map((post, i) => (
          <PostArticle key={i} post={post} />
        ))}
      </div>
    </>
  );
};

export default PostsOf;

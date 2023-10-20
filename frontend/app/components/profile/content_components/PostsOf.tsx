import useLoadingPosts from "@/app/hooks/useLoadingPosts";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "@/app/context/postsContext";
import Loader from "@/app/utils/assets/Loader";
import PostArticle from "../../posts/PostArticle";
import { Post } from "@/app/utils/types";
import PostFormMD from "../../forms/PostFormMD";

const PostsOf = ({
  isSame,
  userID,
}: {
  isSame: boolean | undefined;
  userID: string;
}) => {
  const isLoadingPosts = useLoadingPosts();
  const postsContext = useContext(PostsContext);
  const [userPosts, setUserPosts] = useState<Post[]>([] as Post[]);

  useEffect(() => {
    if (postsContext.posts) {
      setUserPosts(
        postsContext.posts.filter((post) => post.user._id === userID)
      );
    }
    // Filtering everytime this component is visible and a change to the posts context happens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsContext]);

  return (
    <>
      {isSame && <PostFormMD />}
      {isLoadingPosts && <Loader />}
      {!isLoadingPosts && userPosts?.length === 0 && (
        <p className="w-full self-center text-white2 bg-bgContainers p-2 rounded mt-2">
          This user doesn&apos;t have any posts yet.
        </p>
      )}
      <div className="mt-4 flex flex-col font-ubuntu text-secondary gap-4 w-full h-full">
        {userPosts.map((post, i) => (
          <PostArticle key={i} post={post} />
        ))}
      </div>
    </>
  );
};

export default PostsOf;

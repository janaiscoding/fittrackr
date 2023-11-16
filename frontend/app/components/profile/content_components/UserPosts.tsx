import useLoadingPosts from "@/app/hooks/useLoadingPosts";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "@/app/context/postsContext";
import Loader from "@/app/utils/assets/Loader";
import PostArticle from "../../posts/PostArticle";
import { Post } from "@/app/utils/types";
import PostFormMD from "../../forms/PostFormMD";
import LoaderPost from "../../ui_elements/LoaderPost";

const UserPosts = ({
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
      {isLoadingPosts && (
        <div className="flex flex-col gap-2 mt-4">
          <LoaderPost />
          <LoaderPost />
          <LoaderPost />
        </div>
      )}

      {!isLoadingPosts && userPosts?.length === 0 && (
        <p className="w-full self-center text-secondary dark:text-gray-200 bg-bgContainers dark:bg-gray-800 p-2 shadow-md my-2">
          {isSame ? `You don't` : `This user doesn't`} have any posts yet.
          Create your first now!
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

export default UserPosts;

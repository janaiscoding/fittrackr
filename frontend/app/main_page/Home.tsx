import { SetStateAction, useContext, useEffect, useState } from "react";
import FormPost from "../components/forms/FormPost";
import { Post } from "../__types__/types";
import getPosts from "../api/posts/get_posts";
import { UserContext } from "../context/userContext";
import PostArticle from "../components/PostArticle";

const Home = ({
  isShown,
  setShown,
}: {
  isShown: boolean;
  setShown: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const userContext = useContext(UserContext);

  useEffect(() => {
    getPosts(setPosts);
  }, [userContext]);

  return (
    <div className="min-h-[90vh] my-4 flex flex-col md:items-center">
      {/* <h1 className="text-2xl font-ubuntu-500 px-4">Feed..</h1> */}
      <div className="flex flex-col gap-6 md:w-1/2">
        {posts.length === 0 && "Loading animation"}
        {posts.map((post, i) => (
          <PostArticle key={i} post={post} />
        ))}
      </div>
      {isShown && <FormPost setShown={setShown} />}
    </div>
  );
};

export default Home;

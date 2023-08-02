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
    <div className="min-h-[90vh] md:px-20 flex md:justify-between justify-center items-start gap-2">
      <div className="hidden md:block">left side</div>
      <div className="flex flex-col gap-6 bg-black">
        <h1 className="ml-4">Create a new post</h1>
        <h1 className="ml-4 text-2xl font-ubuntu-500 self-start border-b-2 border-yellow2">
          Feed..
        </h1>
        {posts.length === 0 && "Loading animation"}
        {posts.map((post, i) => (
          <PostArticle key={i} post={post} />
        ))}
        {isShown && <FormPost setShown={setShown} />}
      </div>
      <div className="hidden md:block">right side</div>
    </div>
  );
};

export default Home;

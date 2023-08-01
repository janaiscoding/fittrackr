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
    console.log("fetched new post on main page", posts);
  }, [userContext]);
  return (
    <div className="min-h-[90vh] flex flex-col px-6 ">
      {posts.map((post, i) => (
        <PostArticle key={i} post={post} />
      ))}
      {isShown && <FormPost setShown={setShown} />}
    </div>
  );
};

export default Home;

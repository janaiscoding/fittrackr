import { SetStateAction, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { getJwtToken } from "../api/auth/auth_handler";
import { useRouter } from "next/navigation";
import FormPost from "../components/forms/FormPost";
import verifyToken from "../api/auth/verify_token";
import { Post } from "../__types__/types";
import getPosts from "../api/posts/get_posts";
import PostComponent from "../components/PostArticle";

const Home = ({
  isShown,
  setShown,
}: {
  isShown: boolean;
  setShown: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const userContext = useContext(UserContext);
  const router = useRouter()
  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, userContext.setUser,router );
    } else {
      console.log("redirecting here or in verify function?");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPosts(setPosts);
  }, [isShown]);
  return (
    <div className="min-h-[90vh] flex flex-col px-6 ">
      {posts.map((post, i) => (
        <PostComponent key={i} post={post} />
      ))}
      {isShown && <FormPost setShown={setShown} />}
    </div>
  );
};

export default Home;

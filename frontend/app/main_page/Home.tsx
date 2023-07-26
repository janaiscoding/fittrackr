"use client";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { getJwtToken } from "../api/auth_handler";
import { useRouter } from "next/navigation";
import FormPost from "./FormPost";
import verifyToken from "../api/verify_token";
import { Post } from "../__types__/types";
import getPosts from "../api/get_posts";
import PostComponent from "./PostComponent";

const Home = ({
  isShown,
  setShown,
}: {
  isShown: boolean;
  setShown: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const token = getJwtToken();
    if (token && router) {
      verifyToken(token, userContext.setUser, router);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getPosts(setPosts);
  }, [isShown]);
  return (
    <div className="min-h-screen p-6">
      Welcome back, {userContext.user?.first_name} {userContext.user?.last_name}
      <div>
        {posts.map((post, i) => (
          <PostComponent key={i} post={post} />
        ))}
        {isShown && <FormPost setShown={setShown} />}
      </div>
    </div>
  );
};

export default Home;

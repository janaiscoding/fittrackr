/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { getJwtToken } from "@/app/api/auth_handler";
import { UserContext } from "@/app/context/userContext";
import { Post, User } from "@/app/__types__/types";
import { useRouter } from "next/navigation";

import getUser from "@/app/api/get_user";
import verifyToken from "@/app/api/verify_token";
import getUserPosts from "@/app/api/get_user_posts";
import UserInfo from "./UserInfo";
import PostArticle from "@/app/ui_components/PostArticle";

const UserPage = ({ id, isShown }: { id: string; isShown: boolean }) => {
  const [profile, setProfile] = useState<User>({} as User);
  const [posts, setPosts] = useState<Post[]>([]);

  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, userContext.setUser, router); //establishing protected route correctly on /users/:id
    }
    getUser(id, setProfile);
  }, []);

  useEffect(() => {
    getUserPosts(id, setPosts);
    //Refresh if: 1. A new post is created || 2. When user profile picture changes
  }, [isShown, userContext]);

  return (
    <div className="p-6 overflow-hidden">
      {Object.keys(profile).length === 0 ? (
        "Loading animation"
      ) : (
        <UserInfo profile={profile} />
      )}

      {posts.map((post, i) => (
        <PostArticle key={i} post={post} />
      ))}
    </div>
  );
};

export default UserPage;

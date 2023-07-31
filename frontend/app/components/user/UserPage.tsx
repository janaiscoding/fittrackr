/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/userContext";
import { Post, User } from "@/app/__types__/types";
import { usePathname, useRouter } from "next/navigation";

import verifyToken from "@/app/api/auth/verify_token";
import PostArticle from "@/app/components/PostArticle";
import Info from "./Info";
import getUserPosts from "@/app/api/users/get_user_posts";
import getUser from "@/app/api/users/get_user";
import { getJwtToken } from "@/app/api/auth/auth_handler";

const UserPage = ({ id, isShown }: { id: string; isShown: boolean }) => {
  const [profile, setProfile] = useState<User>({} as User);
  const [posts, setPosts] = useState<Post[]>([]); // or undefined for the sake of loading animaiton

  const router = useRouter();
  const path = usePathname()
  const userContext = useContext(UserContext);

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, userContext.setUser, router);
      //Establishing protected route correctly on /users/:id
    }
    
  }, []);
  useEffect(() => {
    if(path === `user/${userContext.user?._id}`){
      console.log('im on my own page')
    } else {
    //This will set a generic user, and not the userContext one, which is set with verify token
    getUser(id, setProfile);
    }
  },[])

  useEffect(() => {
    getUserPosts(id, setPosts);
    //Only refresh if: 1. A new post is created || 2. When user profile picture changes || 3. When a post was deleted
  }, [userContext]);

  return (
    <div className="p-6 overflow-hidden">
      {Object.keys(profile).length === 0 ? (
        <p className="text-grey"> Loading animation</p>
      ) : (
        <Info profile={profile} />
      )}
      {posts.length === 0 ? (
        <p className="text-grey"> Loading animation/no posts yet</p>
      ) : (
        posts.map((post, i) => <PostArticle key={i} post={post} />)
      )}
    </div>
  );
};

export default UserPage;

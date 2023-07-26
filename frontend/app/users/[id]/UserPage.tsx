import { useContext, useEffect, useState } from "react";
import { getJwtToken } from "@/app/api/auth_handler";
import { UserContext } from "@/app/context/userContext";
import { Post, User } from "@/app/__types__/types";
import { useRouter } from "next/navigation";
import PostComponent from "@/app/main_page/PostComponent";
import getUser from "@/app/api/get_user";
import verifyToken from "@/app/api/verify_token";
import getUserPosts from "@/app/api/get_user_posts";
import UserInfo from "./UserInfo";

const UserPage = ({ id, isShown }: { id: string; isShown: boolean }) => {
  const [profile, setProfile] = useState<User>({} as User);
  const [posts, setPosts] = useState<Post[]>([]);

  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, userContext.setUser, router);
    }
    getUser(id, setProfile);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserPosts(id, setPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShown]);

  return (
    <div className="p-6 overflow-hidden">
      {Object.keys(profile).length === 0 ? (
        "Loading animation"
      ) : (
        <UserInfo profile={profile} />
      )}

      {/* {posts.map((post, i) => (
        <PostComponent key={i} post={post} />
      ))} */}
    </div>
  );
};

export default UserPage;

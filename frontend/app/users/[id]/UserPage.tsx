import { useContext, useEffect, useState } from "react";
import { getJwtToken, removeJwtToken } from "@/app/api/auth_handler";
import { UserContext } from "@/app/context/userContext";
import { Post, User } from "@/app/__types__/types";
import { useRouter } from "next/navigation";
import PostComponent from "@/app/main_page/PostComponent";
import getUser from "@/app/api/get_user";
import getPosts from "@/app/api/get_posts";
import verifyToken from "@/app/api/verify_token";

const UserPage = ({ id }: { id: string }) => {
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
    getPosts(setPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-6 overflow-scroll">
      <p>
        {profile.first_name} {profile.last_name}
      </p>
      <p> bio: {profile.bio}</p>
      {posts
        .filter((post) => post.user._id === id)
        .map((post, i) => (
          <PostComponent key={i} post={post} />
        ))}
    </div>
  );
};

export default UserPage;

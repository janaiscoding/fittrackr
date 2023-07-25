import { useContext, useEffect, useState } from "react";
import { getJwtToken, removeJwtToken } from "@/app/api/auth_handler";
import { UserContext, UserContextProvider } from "@/app/context/userContext";
import { User } from "@/app/__types__/types";
import { verifyAPI } from "@/app/api/endpoints";
import { useRouter } from "next/navigation";
import axios from "axios";
import PostComponent from "@/app/main_page/PostComponent";
import ProfilePost from "./ProfilePost";

const UserPage = ({ id }: { id: string }) => {
  const [profile, setProfile] = useState<User>({} as User);

  const router = useRouter();
  const userContext = useContext(UserContext);

  const verifyToken = async (
    token: string,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
  ) => {
    await fetch(verifyAPI, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          //Rejected/Invalid Token!! Remove Token | Clear User | Redirect to login
          removeJwtToken();
          setUser(null);
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      verifyToken(token, userContext.setUser);
    }
    axios
      .get(`https://fiturself.fly.dev/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(profile.posts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-6">
      <p>
        {profile.first_name} {profile.last_name}
      </p>
      <p> bio: {profile.bio}</p>
      {profile.posts.map((post, i) => (
        <ProfilePost key={i} post={post} user={profile}/>
      ))}
    </div>
  );
};

export default UserPage;

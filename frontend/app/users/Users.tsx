import { useContext, useEffect, useState } from "react";
import { getJwtToken, removeJwtToken } from "../api/auth_handler";
import { UserContext, UserContextProvider } from "../context/userContext";
import { useRouter } from "next/navigation";
import { CommunityUser, ShortUser, User } from "../__types__/types";
import { verifyAPI } from "../api/endpoints";
import axios from "axios";
import UserComponent from "./User";
import FormPost from "../main_page/FormPost";

const UsersComponent = () => {
  const [users, setUsers] = useState<CommunityUser[]>([]);

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
      .get(`https://fiturself.fly.dev/users`, {
        headers: {
          Authorization: `Bearer ${getJwtToken()}`,
        },
      })
      .then((res) => {
        console.log(res.data.users);
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      <h1>List of all users</h1>
      {users.map((user, i) => (
        <UserComponent key={i} user={user} />
      ))}
    </div>
  );
};

export default UsersComponent;

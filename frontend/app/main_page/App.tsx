"use client";
import { SetStateAction, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { getJwtToken, removeJwtToken } from "../api/auth_handler";
import { useRouter } from "next/navigation";
import { User } from "../__types__/types";
import { verifyAPI } from "../api/endpoints";
import Posts from "./AllPosts";
import FormPost from "./FormPost";

const App = ({
  isShown,
  setShown,
}: {
  isShown: boolean;
  setShown: React.Dispatch<SetStateAction<boolean>>;
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-6">
      Welcome back,{userContext.user?.first_name} {userContext.user?.last_name}
      <Posts />
      {isShown && <FormPost setShown={setShown} />}
    </div>
  );
};

export default App;

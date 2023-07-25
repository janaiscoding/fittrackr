"use client";
import { SetStateAction, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { getJwtToken } from "../api/auth_handler";
import { useRouter } from "next/navigation";
import Posts from "./AllPosts";
import FormPost from "./FormPost";
import verifyToken from "../api/verify_token";

const App = ({
  isShown,
  setShown,
}: {
  isShown: boolean;
  setShown: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const token = getJwtToken();
    if (token && router) {
      verifyToken(token, userContext.setUser, router);
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

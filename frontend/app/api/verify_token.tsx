import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { User } from "../__types__/types";
import { removeJwtToken } from "./auth_handler";
import { verifyAPI } from "./endpoints";

const verifyToken = async (
  token: string,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  router: AppRouterInstance
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

export default verifyToken;

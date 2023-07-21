import { User } from "../types/types";
import { verifyAPI } from "./endpoints";

const verifyToken = async (
  token: string | undefined,
  setUserData: React.Dispatch<User>
) => {
  await fetch(verifyAPI, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setUserData(data.user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default verifyToken;

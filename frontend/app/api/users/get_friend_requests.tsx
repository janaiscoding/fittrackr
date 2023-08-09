import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
import { ShortUser } from "@/app/__types__/types";

const getFriendRequests = (
  userID: string,
  setter: React.Dispatch<SetStateAction<ShortUser[]>>
) => {
  fetch(`https://fiturself.fly.dev/users/${userID}/received`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setter(data.received)
    })
    .catch((err) => console.log(err));
};

export default getFriendRequests;

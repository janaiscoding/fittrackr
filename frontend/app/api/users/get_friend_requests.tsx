import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
import { CommunityUser, User } from "@/app/__types__/types";

const getFriendRequests = (
  userID: string,
  setter: React.Dispatch<SetStateAction<CommunityUser[]>>
) => {
  fetch(`https://fiturself.fly.dev/users/${userID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.user !== undefined) {
        setter((prevState) => [...prevState, data.user]);
      }
    })
    .catch((err) => console.log(err));
};

export default getFriendRequests;

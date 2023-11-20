import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
import { User } from "../../types";

const getFriendRequests = (
  userID: string,
  setter: React.Dispatch<SetStateAction<User[]>>,
  stopLoader: () => void
) => {
  fetch(`https://socializer.fly.dev/users/${userID}/received`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setter(data.received);
      stopLoader();
    })
    .catch((err) => console.log(err));
};

export default getFriendRequests;

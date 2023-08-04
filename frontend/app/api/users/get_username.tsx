import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";

const getUsername = (
  userID: string,
  setter: React.Dispatch<SetStateAction<string[]>>
) => {
  fetch(`https://fiturself.fly.dev/users/${userID}/username`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.username !== undefined) {
        setter((prevState) => [...prevState, data.username]);
      }
    })
    .catch((err) => console.log(err));
};

export default getUsername;

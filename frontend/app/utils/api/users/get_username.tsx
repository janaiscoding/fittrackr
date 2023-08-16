import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
// DEPRECATED: THIS IS THE WRONG WAY TO DO THIS, IT CALLS THE API TOO MANY TIMES: STATUS 429, TOO MANY REQUESTS.
const getUsername = (
  userID: string,
  setter: React.Dispatch<SetStateAction<string[]>>
) => {
  fetch(`https://fittrackr.fly.dev/users/${userID}/username`, {
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

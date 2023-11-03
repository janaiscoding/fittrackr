
import { User } from "../../types";
import { getJwtToken } from "../auth/auth_handler";

const getFriends = (userID: string, handleSuccess: (friends: User[]) => void) => {
  fetch(`https://socializer.fly.dev/users/${userID}/friends`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      handleSuccess(data.friends);
    })
    .catch((err) => console.log(err));
};
export default getFriends;

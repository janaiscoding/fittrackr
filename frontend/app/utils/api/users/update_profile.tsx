import { User } from "../../types";
import { getJwtToken } from "../auth/auth_handler";

const updateProfile = (
  userID: string | undefined,
  ufirst_name: string | undefined,
  ulast_name: string | undefined,
  ubio: string | undefined,
  handleSucces: (uUser: User) => void,
  handleError: () => void
) => {
  fetch(`https://socializer.fly.dev/users/${userID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({
      ufirst_name,
      ulast_name,
      ubio,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message.includes("success")) {
        handleSucces(data.uUser);
      } else {
        handleError()
      }
    })
    .catch((err) => {
      handleError();
      console.log(err);
    });
};

export default updateProfile;

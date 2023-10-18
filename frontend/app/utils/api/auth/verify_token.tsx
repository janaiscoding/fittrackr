
import { User } from "../../types";
import { verifyAPI } from "../endpoints";

const verifyToken = (
  token: string | undefined,
  handleAuthorized: (user: User) => void,
  handleUnauthorized: () => void
) => {
  fetch(verifyAPI, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) =>
      data.user ? handleAuthorized(data.user) : handleUnauthorized()
    )
    .catch((err) => {
      handleUnauthorized()
      console.log(err);
    });
};

export default verifyToken;

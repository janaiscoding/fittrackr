import axios from "axios";
import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
import { User } from "../../types";

const getProfile = (
  userID: string | undefined,
  setter: React.Dispatch<SetStateAction<User>>,
  handleError: () => void
) => {
  axios
    .get(`https://socializer.fly.dev/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => {
      setter(res.data.user);
    })
    .catch((err) => {
      handleError();
    });
};

export default getProfile;

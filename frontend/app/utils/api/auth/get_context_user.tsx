import axios from "axios";
import { SetStateAction } from "react";
import { getJwtToken } from "./auth_handler";
import { User } from "../../types";

// Usable when I need to deal with fetching/ updating the current context. To not be confused with getProfile. This is for making posts, workouts, etc.
const getContextUser = (
  id: string | undefined,
  setter: React.Dispatch<SetStateAction<User | null>>
) => {
  axios
    .get(`https://socializer.fly.dev/users/${id}`, {
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => {
      setter(res.data.user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getContextUser;

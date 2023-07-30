import axios from "axios";
import { SetStateAction } from "react";
import { User } from "../__types__/types";
import { getJwtToken } from "./auth_handler";

const getProfile = (
  id: string | undefined,
  setter: React.Dispatch<SetStateAction<User | null>>
) => {
  console.log("called get profile", id);
  axios
    .get(`https://fiturself.fly.dev/users/${id}`, {
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

export default getProfile;

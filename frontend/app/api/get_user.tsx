import axios from "axios";
import { SetStateAction } from "react";
import { User } from "../__types__/types";
import { getJwtToken } from "./auth_handler";

const getUser = async (
  id: string,
  setter: React.Dispatch<SetStateAction<User>>
) => {
  await axios
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

export default getUser;

import axios from "axios";
import { SetStateAction } from "react";
import { User } from "../../__types__/types";
import { getJwtToken } from "../auth/auth_handler";

const getUser = (id: string, setter: React.Dispatch<SetStateAction<User>>) => {
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

export default getUser;

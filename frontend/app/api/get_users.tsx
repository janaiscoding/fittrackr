import axios from "axios";
import { SetStateAction } from "react";
import { CommunityUser } from "../__types__/types";
import { getJwtToken } from "./auth_handler";

const getUsers = async (
  setter: React.Dispatch<SetStateAction<CommunityUser[]>>
) => {
  await axios
    .get(`https://fiturself.fly.dev/users`, {
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => {
      setter(res.data.users);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getUsers;

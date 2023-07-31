import axios from "axios";
import { SetStateAction } from "react";
import { CommunityUser } from "../../__types__/types";
import { getJwtToken } from "../auth/auth_handler";
import { usersAPI } from "../endpoints";

const getUsers = (setter: React.Dispatch<SetStateAction<CommunityUser[]>>) => {
  axios
    .get(usersAPI, {
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

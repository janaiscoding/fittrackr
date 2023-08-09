import axios from "axios";
import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
import { usersAPI } from "../endpoints";
import { User } from "@/app/__types__/types";

const getAllUsers = (
  setter: React.Dispatch<SetStateAction<User[]>>,
  currentID: string
) => {
  axios
    .get(usersAPI, {
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => {
      const community = res.data.users.filter(
        (user: User) => user._id !== currentID
      );
      setter(community);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getAllUsers;

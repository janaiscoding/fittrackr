import axios from "axios";
import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
import { usersAPI } from "../endpoints";
import { User } from "@/app/__types__/types";

const getAllUsers = (
  currentID: string,
  handleSuccess: (data: User[]) => void
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
      handleSuccess(community);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getAllUsers;

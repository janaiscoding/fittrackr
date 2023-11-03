import axios from "axios";
import { getJwtToken } from "../auth/auth_handler";
import { usersAPI } from "../endpoints";
import { User } from "../../types";


const getAllUsers = (
  // currentID: string,
  handleSuccess: (data: User[]) => void
) => {
  axios
    .get(usersAPI, {
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => {
      // const community = res.data.users.filter(
      //   (user: User) => user._id !== currentID
      // );
      handleSuccess(res.data.users);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getAllUsers;

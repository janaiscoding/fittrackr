import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
import axios from "axios";
import { Post } from "../../types";

const getUserPosts = (
  userID: string,
  setter: React.Dispatch<SetStateAction<Post[]>>
) => {
  axios
    .get(`https://socializer.fly.dev/users/${userID}/posts`, {
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => {
      setter(res.data.posts);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getUserPosts;

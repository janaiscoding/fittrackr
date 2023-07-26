import { SetStateAction } from "react";
import { Post } from "../__types__/types";
import { getJwtToken } from "./auth_handler";
import axios from "axios";

const getUserPosts = async (
  userID: string,
  setter: React.Dispatch<SetStateAction<Post[]>>
) => {
  await axios
    .get(`https://fiturself.fly.dev/users/${userID}/posts`, {
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

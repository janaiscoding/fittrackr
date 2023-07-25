import { SetStateAction } from "react";
import { Post } from "../__types__/types";
import { getJwtToken } from "./auth_handler";
import axios from "axios";

const getPosts = async (setter: React.Dispatch<SetStateAction<Post[]>>) => {
  await axios
    .get(`https://fiturself.fly.dev/posts`, {
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

export default getPosts;

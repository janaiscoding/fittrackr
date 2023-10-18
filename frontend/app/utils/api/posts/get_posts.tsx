import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
import axios from "axios";
import { postsAPI } from "../endpoints";
import { Post } from "../../types";

const getPosts = (setter: React.Dispatch<SetStateAction<Post[] | null>>) => {
  axios
    .get(postsAPI, {
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

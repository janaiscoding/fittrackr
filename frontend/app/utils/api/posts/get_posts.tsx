import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
import axios from "axios";
import { postsAPI } from "../endpoints";
import { Post } from "../../types";

const getPosts = async (
  setter: React.Dispatch<SetStateAction<Post[] | null>>,
  handleLoad: () => void
) => {
  axios
    .get(postsAPI, {
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => {
      setter(res.data.posts);
      handleLoad();
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getPosts;

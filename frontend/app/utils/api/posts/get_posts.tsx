import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
import { postsAPI } from "../endpoints";
import { Post } from "../../types";

const getPosts = (
  setter: React.Dispatch<SetStateAction<Post[] | null>>,
  handleLoad: () => void
) => {
  fetch(postsAPI, {
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      handleLoad();
      setter(data.posts);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getPosts;

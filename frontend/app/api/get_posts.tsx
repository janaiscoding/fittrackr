import { SetStateAction } from "react";
import { Post } from "../__types__/types";
import { getJwtToken } from "./auth_handler";
import axios from "axios";
import { postsAPI } from "./endpoints";

const getPosts = (setter: React.Dispatch<SetStateAction<Post[]>>) => {
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

const helpRosco = () => {
  fetch("https://blogapi-production-8080.up.railway.app/posts")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export default getPosts;

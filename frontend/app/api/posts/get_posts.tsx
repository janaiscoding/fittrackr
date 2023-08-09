import { SetStateAction } from "react";
import { Post } from "../../__types__/types";
import { getJwtToken } from "../auth/auth_handler";
import axios from "axios";

const getPosts = (setter: React.Dispatch<SetStateAction<Post[] | null>>) => {
  console.log("calling get posts and updating context....");
  axios
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

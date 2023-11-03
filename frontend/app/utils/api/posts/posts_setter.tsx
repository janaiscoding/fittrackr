import { SetStateAction } from "react";
import { Post } from "../../types";
import { postsAPI } from "../endpoints";
import { getJwtToken } from "../auth/auth_handler";

const getPostsSetter = (
  setter: React.Dispatch<SetStateAction<Post[] | null>>
) => {
  fetch(postsAPI, {
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log("fetched");
      setter(data.posts);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getPostsSetter;

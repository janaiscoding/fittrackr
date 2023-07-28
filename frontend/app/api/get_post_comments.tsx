import { SetStateAction } from "react";
import { Comment } from "../__types__/types";
import { getJwtToken } from "./auth_handler";
import axios from "axios";

const getPostComments = (
  id: string,
  setter: React.Dispatch<SetStateAction<Comment[]>>
) => {
  axios
    .get(`https://fiturself.fly.dev/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
    .then((res) => {
      // console.log(res.data.post.comments)
      setter(res.data.post.comments);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getPostComments;

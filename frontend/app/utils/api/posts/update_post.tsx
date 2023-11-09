import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";

const updatePost = (
  postID: string,
  uDescription: string,
  handleSuccess: () => void,
  setError: React.Dispatch<SetStateAction<string>>
) => {
  fetch(`https://socializer.fly.dev/posts/${postID}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uDescription }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        handleSuccess();
      }
      if (data.errors) setError(data.errors[0].msg);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default updatePost;

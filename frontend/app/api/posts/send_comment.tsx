import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";

const sendComment = async (
  id: string,
  comment: string,
  userID: string | undefined,
  handleSuccess: () => void,
  handleError: (msg) => void
) => {
  console.log("sending comment");
  await fetch(`https://fiturself.fly.dev/posts/${id}/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ comment, userID }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        handleError(data.errors[0].msg);
      }
      handleSuccess();
    })
    .catch((err) => console.log(err));
};
export default sendComment;

import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";
//postID, comment, userContext.user?._id, handleSuccess, handleError
const sendComment = async (
  postID: string,
  comment: string,
  userID: string | undefined,
  handleSuccess: () => void,
  handleError: (msg: string) => void
) => {
  console.log("sending comment", postID, comment, userID);
  await fetch(`https://fiturself.fly.dev/posts/${postID}/`, {
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
      } else {
        handleSuccess();
      }
    })
    .catch((err) => console.log(err));
};
export default sendComment;

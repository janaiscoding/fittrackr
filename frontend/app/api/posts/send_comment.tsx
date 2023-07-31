import { SetStateAction } from "react";
import { getJwtToken } from "../auth/auth_handler";

const sendComment = async (
  id: string,
  comment: string,
  userID: string | undefined,
  setCommentError: React.Dispatch<SetStateAction<string>>
) => {
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
        setCommentError(data.errors[0].msg);
      } 
      //comment success
    })
    .catch((err) => console.log(err));
};
export default sendComment;

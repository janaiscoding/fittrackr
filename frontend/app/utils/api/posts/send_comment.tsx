import { getJwtToken } from "../auth/auth_handler";
const sendComment = async (
  postID: string,
  comment: string,
  userID: string | undefined,
  handleSuccess: () => void,
  handleError: (msg: string) => void
) => {
  await fetch(`https://socializer.fly.dev/posts/${postID}/`, {
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

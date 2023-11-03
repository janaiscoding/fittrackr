import { getJwtToken } from "../auth/auth_handler";

const deleteComment = (
  postID: string,
  commentID: string,
  userID: string | undefined,
  handleSuccess: () => void
) => {
  fetch(`https://socializer.fly.dev/posts/${postID}/${commentID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ userID }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message.includes("success")) {
        handleSuccess();
      }
    })
    .catch((err) => console.log(err));
};

export default deleteComment;

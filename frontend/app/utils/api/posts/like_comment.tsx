import { getJwtToken } from "../auth/auth_handler";

const likeComment = (
  postID: string,
  commentID: string,
  userID: string | undefined,
  handleSuccess: (data: { likes: string[] }) => void
) => {
  fetch(`https://fiturself.fly.dev/posts/${postID}/${commentID}/like`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ userID }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.likes) {
        handleSuccess(data);
      } else {
        //handleError placeholder
        console.log(data);
      }
    })
    .catch((err) => console.log(err));
};
export default likeComment;

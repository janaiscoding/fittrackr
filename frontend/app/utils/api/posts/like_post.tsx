import { getJwtToken } from "../auth/auth_handler";

const likePost = (
  postID: string,
  userID: string | undefined,
  handleSuccess: (data: { likes: string[] }) => void
) => {
  fetch(`https://socializer.fly.dev/posts/${postID}/like`, {
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
        console.log(data); //placeholder for when users spam like button
      }
    })
    .catch((err) => console.log(err));
};
export default likePost;

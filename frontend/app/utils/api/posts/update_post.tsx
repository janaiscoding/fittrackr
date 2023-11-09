import { getJwtToken } from "../auth/auth_handler";

const updatePost = (postID: string, userID: string, uDescription: string) => {
  console.log(
    "save new description: ",
    uDescription,
    "to current post:",
    postID
  );
  fetch(`https://socializer.fly.dev/posts/${postID}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ userID, uDescription }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default updatePost;

import { getJwtToken } from "./auth_handler";

const createPost = async (url: string, text: string) => {
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(function (error) {
      console.log(error);
    });
};
export default createPost;

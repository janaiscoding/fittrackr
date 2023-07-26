import { getJwtToken } from "./auth_handler";
import { postsAPI } from "./endpoints";

const createPost = async (text: string, userID: string) => {
  await fetch(postsAPI, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, userID }),
  })
    .then((res) => res.json())
    .then((data) => {
      //dont need to do anything with this for now. 
      //maybe setup error
    })
    .catch(function (error) {
      console.log(error);
    });
};
export default createPost;

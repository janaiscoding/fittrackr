import { getJwtToken } from "./auth_handler";
import { postsAPI } from "./endpoints";

const createPost = async (formData: any) => {

  await fetch(postsAPI, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
      "Content-Type": "application/json",
    },
    body: formData
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      //dont need to do anything with this for now.
      //maybe setup error
    })
    .catch(function (error) {
      console.log(error);
    });
};
export default createPost;

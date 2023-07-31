import { getJwtToken } from "../auth/auth_handler";
import { postsAPI } from "../endpoints";

const createPost = async (
  formData: any,
  handleError: (data: string) => void,
  handleSuccess: () => void
) => {
  await fetch(postsAPI, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.errors) {
        handleError(data.errors[0].msg);
      } else if (data === "Error: Please select an image.") {
        handleError(data);
      } else {
        handleSuccess();
      }
    })
    .catch((err) => console.log(err));
};
export default createPost;

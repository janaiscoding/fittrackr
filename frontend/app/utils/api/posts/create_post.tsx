import { getJwtToken } from "../auth/auth_handler";
import { postsAPI } from "../endpoints";

const createPost = async (
  formData: any,
  handleError: (data: string) => void,
  handleSuccess: () => void
) => {
  //https://stackoverflow.com/questions/17066875/how-to-inspect-formdata
//   for (var pair of formData.entries()) {
//     console.log(pair[0]+ ', ' + pair[1]); 
// }
  await fetch(postsAPI, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (data.errors) {
        handleError(data.errors[0].msg);
      } else if (data === "Error: Please select an image.") {
        handleError(data);
      } else if (data.error) {
        handleError(data.error)
      }
      else {
        handleSuccess();
      }
    })
    .catch((err) => console.log(err));
};
export default createPost;

import { User } from "../../types";
import { getJwtToken } from "../auth/auth_handler";

const uploadBanner = (
  userID: string,
  formData: any,
  handleSuccess: (updatedUser: User) => void,
  handleError: (data: string) => void
) => {
  fetch(`https://socializer.fly.dev/users/${userID}/banner`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.updatedUser) {
        handleSuccess(data.updatedUser);
      } else if (data.error) {
        handleError(data.error);
      } else {
        handleError(data);
      }
    })
    .catch((err) => console.log(err));
};
export default uploadBanner;

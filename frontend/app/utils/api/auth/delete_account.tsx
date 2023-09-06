import { getJwtToken } from "./auth_handler";

const deleteAccount = (userID: string, handleSuccess: () => void) => {
  fetch(`https://fittrackr.fly.dev/users/${userID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      handleSuccess();
    })
    .catch((err) => {
      console.log(err);
    });
};
export default deleteAccount;

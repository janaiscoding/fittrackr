import { getJwtToken } from "../auth/auth_handler";

const removeFriend = async (
  removedID: string,
  removerID: string | undefined,
  handleSuccess: () => void
) => {
  await fetch(`https://socializer.fly.dev/users/${removedID}/remove`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ removerID }),
  })
    .then((res) => res.json())
    .then((data) => {
      handleSuccess();
    })
    .catch((err) => console.log(err));
};
export default removeFriend;

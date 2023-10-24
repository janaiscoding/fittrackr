import { getJwtToken } from "../auth/auth_handler";

const acceptRequest = async (
  senderID: string,
  receiverID: string | undefined,
  handleSuccess: () => void
) => {
  await fetch(`https://socializer.fly.dev/users/${senderID}/accept`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ receiverID }),
  })
    .then((res) => res.json())
    .then((data) => {
      handleSuccess();
    })
    .catch((err) => console.log(err));
};
export default acceptRequest;

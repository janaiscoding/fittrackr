import { getJwtToken } from "../auth/auth_handler";

const cancelRequest = async (
  receiverID: string,
  senderID: string | undefined,
  handleSuccess: () => void
) => {
  await fetch(`https://socializer.fly.dev/users/${receiverID}/cancel`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ senderID }),
  })
    .then((res) => res.json())
    .then((data) => {
      handleSuccess();
    })
    .catch((err) => console.log(err));
};

export default cancelRequest;

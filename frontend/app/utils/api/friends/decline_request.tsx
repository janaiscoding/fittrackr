import { getJwtToken } from "../auth/auth_handler";

const declineRequest = async (
  senderID: string,
  receiverID: string | undefined,
  handleSuccess: () => void
) => {
  await fetch(`https://fiturself.fly.dev/users/${senderID}/decline`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ receiverID }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message && data.message.includes("declined")) {
        handleSuccess();
      }
    })
    .catch((err) => console.log(err));
};
export default declineRequest;
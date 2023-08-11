import { getJwtToken } from "../auth/auth_handler";

const cancelRequest = async (
  receiverID: string,
  senderID: string | undefined,
  handleSuccess: (status: string) => void
) => {
  await fetch(`https://fiturself.fly.dev/users/${receiverID}/cancel`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ senderID }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message && data.message.includes("canceled")) {
        handleSuccess("canceled");
      }
    })
    .catch((err) => console.log(err));
};

export default cancelRequest;

import { getJwtToken } from "../auth/auth_handler";

const sendRequest = async (
  receiverID: string,
  senderID: string | undefined,
  handleSuccess: (status: string) => void
) => {
  await fetch(`https://fittrackr.fly.dev/users/${receiverID}/send`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ senderID }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message && data.message.includes("sent")) {
        handleSuccess("sent");
      }
    })
    .catch((err) => console.log(err));
};

export default sendRequest;

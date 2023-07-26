import { getJwtToken } from "../auth_handler";

const cancelRequest = async (receiverID: string, senderID: string | undefined) => {
  console.log("cancel fr");
  await fetch(`https://fiturself.fly.dev/users/${receiverID}/cancel`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ senderID }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export default cancelRequest;

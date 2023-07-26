import { getJwtToken } from "../auth_handler";

const sendRequest = async (receiverID: string, senderID: string | undefined) => {
  console.log("seding fr");
  await fetch(`https://fiturself.fly.dev/users/${receiverID}/send`, {
    method: "POST",
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

export default sendRequest;

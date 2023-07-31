import { getJwtToken } from "../auth/auth_handler";

const acceptRequest = async (
  senderID: string,
  receiverID: string | undefined
) => {
  await fetch(`https://fiturself.fly.dev/users/${senderID}/accept`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ receiverID }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
export default acceptRequest;

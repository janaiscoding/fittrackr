import { getJwtToken } from "../auth_handler";

const declineRequest = async (
  senderID: string,
  receiverID: string | undefined
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
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
export default declineRequest;

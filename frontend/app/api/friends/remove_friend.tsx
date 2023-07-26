import { getJwtToken } from "../auth_handler";

const removeFriend = async (removedID: string, removerID: string | undefined) => {
  await fetch(`https://fiturself.fly.dev/users/${removedID}/remove`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify({ removerID }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
export default removeFriend;

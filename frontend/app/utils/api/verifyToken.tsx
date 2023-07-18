import { verifyAPI } from "./endpoints";

const verifyToken = async (
  token: string | null,
  setUserData: React.Dispatch<any[]>
) => {
  await fetch("https://fiturself.fly.dev/verify", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setUserData(data.user);
      //do stuff with data here
    })
    .catch((err) => {
      console.log(err);
    });
};

export default verifyToken;

import { User } from "../types/types";

const fetchFullUser = async (
  token: string,
  id: string,
  setProfileData: React.Dispatch<User> // fix posts types
) => {
  await fetch(`https://fiturself.fly.dev/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.user);
      setProfileData(data.user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default fetchFullUser;

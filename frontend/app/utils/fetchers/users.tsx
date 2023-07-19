import { usersAPI } from "../api/endpoints";

const fetchUsers = async (
  token: string,
  setUsersData: React.Dispatch<any[]> // fix posts types
) => {
  await fetch(usersAPI, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setUsersData(data.users);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default fetchUsers;

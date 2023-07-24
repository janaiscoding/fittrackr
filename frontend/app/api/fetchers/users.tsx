import { usersAPI } from "../endpoints";

const fetchUsers = async (
  token: string,
  // setUsersData: React.Dispatch<User[]> // fix users types
) => {
  await fetch(usersAPI, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log("An error occured while fetching");
    });
};

export default fetchUsers;

import { usersAPI } from "../api/endpoints";

type User = {
  first_name: string;
  friends: string[];
  last_name: string;
  avatar: {
    contentType: string;
    data: any;
  } | null;
  posts: {}[];
  requestsReceived: string[];
  workouts: {}[];
  _id: string;
};

const fetchUsers = async (
  token: string,
  setUsersData: React.Dispatch<[]> // fix posts types
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

"use client";

import { useEffect, useState } from "react";
import fetchUsers from "../utils/fetchers/users";
import { getJwtToken } from "../utils/auth_handler";
import UserData from "../utils/types/types";

const UserPage = () => {
  const [usersData, setUsersData] = useState<any>([]);
  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      fetchUsers(token, setUsersData);
    }
  }, []);

  //add fallback
  return (
    <div>
      <p>USER LIST</p>
      {usersData.map((user: UserData, i:number) => (
        <a href={`/users/${user._id}`} key={user._id}>
          {i + 1}. {user.first_name}
        </a>
      ))}
    </div>
  );
};

export default UserPage;

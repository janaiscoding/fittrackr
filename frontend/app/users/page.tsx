"use client";

import { useEffect, useState } from "react";
import fetchUsers from "../utils/fetchers/users";
import { getJwtToken } from "../utils/auth_handler";

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
      {usersData.map((user, i) => (
        <a href={`/users/${user._id}`} key={i}>
          {i + 1}. {user.first_name}
        </a>
      ))}
    </div>
  );
};

export default UserPage;

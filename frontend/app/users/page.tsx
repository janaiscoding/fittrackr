"use client";

import { useEffect, useState } from "react";
import fetchUsers from "../api/fetchers/users";
import { getJwtToken } from "../api/auth_handler";
import {User} from "../__types__/types";

const UserPage = () => {
  const [usersData, setUsersData] = useState<any>([]);
  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      fetchUsers(token);
    }
  }, []);

  //add fallback
  return (
    <div>
      <p>USER LIST</p>
      {usersData.map((user: User, i:number) => (
        <a href={`/users/${user._id}`} key={i}>
          {i + 1}. {user.first_name}
        </a>
      ))}
    </div>
  );
};

export default UserPage;

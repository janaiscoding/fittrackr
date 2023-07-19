"use client";
import { getJwtToken } from "@/app/utils/auth_handler";
import fetchUser from "@/app/utils/fetchers/user";
import { useEffect, useState } from "react";

const UserPage = ({ params: { id } }: { params: { id: string } }) => {
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      fetchUser(token, id, setUserData);
    }
  }, [id]);

  return <div>{userData.first_name}`s profile page</div>;
};

export default UserPage;

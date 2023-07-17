"use client";

import { useEffect, useState } from "react";
import { getJwtToken } from "./utils/auth_handler";
import { redirect } from "next/navigation";
import Login from "./login/page";
import Image from "next/image";
import Homepage from "./components/Homepage";

export default function Home() {
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState<any>([]);

  const verifyToken = async (token: string | null) => {
    console.log("verifying");
    await fetch("https://fiturself.fly.dev/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        setLogged(true)
        //do stuff with data here
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      setLogged(true);
      verifyToken(token);
    }
  }, []);
  return (
    <main>
      {logged ? (
        <Homepage userData={userData} />
      ) : (
        <Login setLogged={setLogged} setUserData={setUserData} />
      )}
    </main>
  );
}

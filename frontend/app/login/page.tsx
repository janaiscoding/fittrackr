"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJwtToken, setJwtToken } from "../utils/auth_handler";
import { loginAPI } from "../utils/api/endpoints";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    await fetch(loginAPI, opts)
      .then((res) => res.json())
      .then((data) => {
        setJwtToken(data.token);
      })
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      router.push("/");
    }
    console.log("test");
  }, [router]);
  return (
    <div>
      <p>login redirect when not logged in</p>{" "}
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered input-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
            <input
              type="password"
              placeholder="Your password"
              className="input input-bordered input-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-neutral">
          Submit
        </button>
      </form>
      <button
        className="btn"
        onClick={() => {
          router.push("/signup");
        }}
      >
        Create a new account
      </button>
    </div>
  );
};

export default Login;

"use client";

import { SyntheticEvent, useState } from "react";
import { setJwtToken } from "../utils/auth_handler";

const Login = ({ setLogged, setUserData }: any) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch("https://fiturself.fly.dev/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setJwtToken(data.token);
        setLogged(true);
        setUserData(data.user);
      });
  };
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
    </div>
  );
};

export default Login;

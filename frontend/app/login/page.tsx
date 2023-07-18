"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setJwtToken } from "../utils/auth_handler";
import { loginAPI } from "../utils/api/endpoints";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

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
        if (data.token) {
          setJwtToken(data.token);
          router.push("/");
        }
        if (data.message) {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <p>login redirect when not logged in</p> {error}
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
      <a href="/signup" className="btn">
        Create a new account
      </a>
    </div>
  );
};

export default Login;

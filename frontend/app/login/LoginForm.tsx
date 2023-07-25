"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { setJwtToken } from "../api/auth_handler";
import { loginAPI } from "../api/endpoints";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    <div className="w-11/12 p-6 mb-8 bg-black2 rounded-3xl">
      <h1 className="text-3xl text-green text-center font-bold mb-3">
        Welcome back
      </h1>
      <form className="flex flex-col gap-2" onSubmit={(e) => handleLogin(e)}>
        <label className="flex flex-col">
          <span className="self-start text-green">Email</span>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label className="flex flex-col">
          <span className="self-start text-green">Password</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="text-red">{error}</p>}
        <button
          type="submit"
          className="text-2xl text-center text-black bg-green rounded-2xl font-medium py-2 w-full mt-3"
        >
          Sign in
        </button>
      </form>
      <p className="text-center text-grey mt-2">
        Dont have an account?{" "}
        <span className="text-green font-bold">
          {" "}
          <a href="/signup">Sign up</a>
        </span>
      </p>
    </div>
  );
};

export default LoginForm;

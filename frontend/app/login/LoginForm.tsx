"use client";

import { loginAPI } from "@/app/utils/api/endpoints";
import { setJwtToken } from "@/app/utils/auth_handler";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [valid, setValid] = useState(false);

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
    <div className="w-11/12 py-6 px-3 mb-8 flex flex-col items-center justify-center bg-soft-grey rounded-3xl">
      <h1 className="text-3xl text-green text-center font-bold">
        Welcome back
      </h1>
      <form className="flex flex-col gap-2" onSubmit={(e) => handleLogin(e)}>
        <label className="flex flex-col">
          <span className="self-start text-green">Email</span>
          <input
            type="email"
            placeholder="Your Email"
            className={`rounded-xl h-10 px-4 bg-input outline-focused`}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </label>

        <label className="flex flex-col">
          <span className="self-start text-green">Password</span>
          <input
            type="password"
            className="rounded-xl h-10 px-4"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="text-2xl text-center text-black bg-green rounded-2xl font-medium py-2 w-full mt-5"
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

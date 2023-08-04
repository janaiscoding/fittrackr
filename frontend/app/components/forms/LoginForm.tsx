"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { setJwtToken } from "../../api/auth/auth_handler";
import loginRequest from "@/app/api/auth/login_request";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    loginRequest(email, password, handleSuccess, handleError);
  };
  const handleSuccess = (data: { token: string }) => {
    setJwtToken(data.token);
    router.push("/");
  };
  const handleError = (data: { message: string }) => {
    setError(data.message);
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleLogin(e)}>
      <label className="flex flex-col">
        <span className="self-start text-white2">Email</span>
        <input
          className="text-white w-full !bg-blue outline-none py-2 pl-4 pr-12 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="flex flex-col">
        <span className="self-start text-white2">Password</span>
        <input
          className="text-white w-full !bg-blue outline-none py-2 pl-4 pr-12 rounded "
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error && <p className="text-red">{error}</p>}
      <button
        type="submit"
        className="text-2xl text-center text-black bg-yellow rounded-2xl font-medium py-2 w-full md:self-center mt-3"
        aria-label="Sign in button"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;

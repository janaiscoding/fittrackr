"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { setJwtToken } from "../../utils/api/auth/auth_handler";
import loginRequest from "@/app/utils/api/auth/login_request";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ msg: string }[]>(
    [] as { msg: string }[]
  );

  const router = useRouter();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    loginRequest(email, password, handleSuccess, handleError);
  };
  const handleSuccess = (data: { token: string }) => {
    setJwtToken(data.token);
    router.push("/");
  };
  const handleError = (data: {
    errors: { msg: string }[];
    message: string;
  }) => {
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setErrors([{ msg: data.message }]);
    }
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleLogin(e)}>
      <label className="flex flex-col">
        <span className="self-start text-white2">Email</span>
        <input
          className="text-white w-full !bg-bgContainers outline-none py-2 pl-4 pr-12 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="flex flex-col">
        <span className="self-start text-white2">Password</span>
        <input
          className="text-white w-full !bg-bgContainers outline-none py-2 pl-4 pr-12 rounded "
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {errors.length > 0 &&
        errors.map((err, i) => (
          <p className="text-error" key={i}>
            {err.msg}
          </p>
        ))}
      <button
        type="submit"
        className="text-2xl text-center text-black bg-accent rounded-2xl font-medium py-2 w-full md:self-center mt-3"
        aria-label="Sign in button"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;

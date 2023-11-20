"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { setJwtToken } from "../../utils/api/auth/auth_handler";
import loginRequest from "@/app/utils/api/auth/login_request";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{ msg: string }[]>(
    [] as { msg: string }[]
  );

  const router = useRouter();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    loginRequest(email, password, setIsLoading, handleSuccess, handleError);
  };

  const handleSuccess = (data: { token: string }) => {
    setIsLoading(false);
    setJwtToken(data.token);
    router.push("/");
  };
  const handleError = (data: {
    errors: { msg: string }[];
    message: string;
  }) => {
    setIsLoading(false);
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setErrors([{ msg: data.message }]);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleLogin(e)}>
      <label className="flex flex-col">
        <span className="self-start text-secondary dark:text-gray-400">
          Email
        </span>
        <input
          className="input__field"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="flex flex-col">
        <span className="self-start text-secondary dark:text-gray-400">
          Password
        </span>
        <input
          className="input__field"
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
      {isLoading && (
        <div
          className="text-2xl text-center text-white bg-accent rounded font-medium py-2 w-full md:self-center mt-3"
          aria-label="Sign in button"
        >
          Loading...
        </div>
      )}

      {!isLoading && (
        <button
          type="submit"
          className="text-2xl text-center text-white bg-accent rounded font-medium py-2 w-full md:self-center mt-3 hover:bg-accent/90"
          aria-label="Sign in button"
        >
          Log In
        </button>
      )}
    </form>
  );
};

export default LoginForm;

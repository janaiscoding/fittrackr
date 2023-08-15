"use client";
import { useRouter } from "next/navigation";
import loginRequest from "../utils/api/auth/login_request";
import LoginForm from "../components/forms/LoginForm";
import { useState } from "react";
import { setJwtToken } from "../utils/api/auth/auth_handler";
import LogoFront from "../utils/assets/LogoFront";

const Login = () => {
  const [errors, setErrors] = useState<{ msg: string }[]>(
    [] as { msg: string }[]
  );

  const demoEmail = "";
  const demoPassword = "";
  const router = useRouter();
  const handleDemo = () => {
    loginRequest(demoEmail, demoPassword, handleSuccess, handleError);
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
    <div className="min-h-screen gradient-bg flex flex-col justify-center ">
      <div className=" flex flex-col items-center justify-between gap-10 py-10">
        <LogoFront />
        <div className="flex flex-col items-center justify-between gap-1 p-10 rounded border border-neutral-900 gradient-form">
          <div className="text-center text-accent text-2xl font-ubuntu underline">
            Sign in to your account
          </div>
          <LoginForm />
          {errors.length > 0 &&
            errors.map((err, i) => (
              <p className="text-error" key={i}>
                {err.msg}
              </p>
            ))}
          <p className="text-center text-white2 mt-2">
            Don&apos;t have an account?{" "}
            <button
              className="text-accent font-bold"
              aria-label="Click button to navigate to sign up page"
            >
              <a href="/signup">Sign up</a>
            </button>{" "}
          </p>

          <p className="text-center text-white2">
            or try the{" "}
            <button
              className="text-accent font-bold"
              aria-label="Click button to try the demo account"
              onClick={handleDemo}
            >
              Demo account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const ErrorPopup = ({ errors }: { errors: { msg: string }[] }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 bg-bgContainers p-20 rounded-xl">
      {errors.length > 0 &&
        errors.map((err, i) => (
          <p className="text-error" key={i}>
            {err.msg}
          </p>
        ))}
    </div>
  );
};
export default Login;

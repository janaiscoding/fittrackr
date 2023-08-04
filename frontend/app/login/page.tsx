"use client";
import { useRouter } from "next/navigation";
import loginRequest from "../api/auth/login_request";
import Logo from "../assets/svgs/Logo";
import LoginForm from "../components/forms/LoginForm";
import { useState } from "react";
import { setJwtToken } from "../api/auth/auth_handler";

const Login = () => {
  const [errors, setErrors] = useState<{msg:string}[]>([] as {msg:string}[]);

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
  const handleError = (data: { errors: {msg:string}[]; message: string }) => {
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setErrors([{msg: data.message}]);
    }
  };
  console.log(errors)
  return (
    <div className="min-h-screen gradient-bg flex flex-col justify-center ">
      <div className=" flex flex-col items-center justify-between gap-10 py-10">
        <Logo />
        <div className="flex flex-col items-center justify-between gap-1 p-10 rounded border border-neutral-900 gradient-form ">
          <div className="text-center text-yellow text-2xl font-ubuntu underline">
            Sign in to your account
          </div>
          <LoginForm />
          <p className="text-center text-white2 mt-2">
            Dont have an account?{" "}
            <button
              className="text-yellow font-bold"
              aria-label="Click button to navigate to sign up page"
            >
              <a href="/signup">Sign up</a>
            </button>{" "}
          </p>
          <p className="text-center text-white2">
            or try the{" "}
            <button
              className="text-yellow font-bold"
              aria-label="Click button to try the demo account"
              onClick={handleDemo}
            >
              Demo account
            </button>
          </p>
        </div>
      </div>
       {errors.length > 0 && errors.map((err, i) => <p key={i}>{err.msg}</p>)} 
    </div>
  );
};

export default Login;

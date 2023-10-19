"use client";
import { useRouter } from "next/navigation";
import loginRequest from "../utils/api/auth/login_request";
import LoginForm from "../components/forms/LoginForm";
import { useState } from "react";
import { setJwtToken } from "../utils/api/auth/auth_handler";
import LogoFront from "../utils/assets/LogoFront";
import loginDemo from "../demo/loginDemo";
import Footer from "../components/navigation/Footer";

const Login = () => {
  const [errors, setErrors] = useState<{ msg: string }[]>(
    [] as { msg: string }[]
  );

  const router = useRouter();

  const handleDemo = () => {
    loginDemo(handleSuccess, handleError);
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
    <div className="m-auto max-w-5xl h-screen flex flex-col justify-between pt-10">
      <div className="h-screen flex flex-col justify-start md:justify-evenly items-center md:flex-row bg-white">
        <LogoFront />
        <div className="flex flex-col items-center justify-between gap-10 py-10 md:border-l md:order-gray-300">
          <div className="flex flex-col items-center justify-between md:p-10">
            <div className="text-center text-accent text-3xl font-ubuntu-500">
              Log in
            </div>
            <LoginForm />
            {errors.length > 0 &&
              errors.map((err, i) => (
                <p className="text-error" key={i}>
                  {err.msg}
                </p>
              ))}
            <p className="text-center text-black py-2 w-full">
              Don&apos;t have an account?{" "}
              <button
                className="text-accent font-ubuntu-500"
                aria-label="Click button to navigate to sign up page"
              >
                <a href="/signup">Sign up</a>
              </button>{" "}
            </p>
            <button
              className="text-accent text-center font-ubuntu-500"
              aria-label="Click button to try the demo account"
              onClick={handleDemo}
            >
              Try on Demo Account
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

"use client";
import { useRouter } from "next/navigation";
import LoginForm from "../components/forms/LoginForm";
import { useState } from "react";
import { setJwtToken } from "../utils/api/auth/auth_handler";
import LogoFront from "../utils/assets/LogoFront";
import Footer from "../components/ui_elements/Footer";
import loginRequest from "../utils/api/auth/login_request";

const Login = () => {
  const [errors, setErrors] = useState<{ msg: string }[]>(
    [] as { msg: string }[]
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleDemo = () => {
    // It needs a loading status
    loginRequest(
      //@ts-ignore
      process.env.NEXT_PUBLIC_DEMO_EMAIL,
      process.env.NEXT_PUBLIC_DEMO_PASSWORD,
      setIsLoading,
      handleSuccess,
      handleError
    );
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
    <div className="m-auto max-w-5xl min-h-screen flex flex-col justify-between">
      <div className="flex flex-col md:flex-row justify-center mt-[20vh]">
        <div className="flex flex-col items-center gap-2 justify-center basis-full self-center">
          <LogoFront />
        </div>
        <div className="basis-full flex flex-col items-center justify-between gap-10 py-10 md:border-l md:border-slate-700">
          <div className="flex flex-col items-center justify-between md:p-10">
            <div className="text-center text-accent dark:text-gray-400 text-3xl font-ubuntu-500">
              Welcome Back
            </div>
            <LoginForm />
            {errors.length > 0 &&
              errors.map((err, i) => (
                <p className="text-error" key={i}>
                  {err.msg}
                </p>
              ))}
            <p className="text-center py-2 w-full">
              Don&apos;t have an account?{" "}
              <button
                className="text-accent font-ubuntu-500"
                aria-label="Click button to navigate to sign up page"
              >
                <a href="/signup">Sign up</a>
              </button>{" "}
            </p>
            {!isLoading && (
              <button
                className="text-accent dark:text-white text-center font-ubuntu-500 dark:bg-gray-800 rounded p-2 border border-solid border-gray-900 dark:hover:bg-gray-900"
                aria-label="Click button to try the demo account"
                onClick={handleDemo}
              >
                Try on Demo account
              </button>
            )}
            {isLoading && (
              <div className="text-accent dark:text-white text-center font-ubuntu-500 dark:bg-gray-800 rounded p-2 border border-solid border-gray-900 dark:hover:bg-gray-900">
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

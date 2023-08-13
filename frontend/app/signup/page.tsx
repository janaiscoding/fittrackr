"use client";

import { useEffect } from "react";
import { getJwtToken, removeJwtToken } from "../utils/api/auth/auth_handler";
import SignUpForm from "../components/forms/SignupForm";

const SignUp = () => {
  useEffect(() => {
    const token = getJwtToken();
    // When manually pathing to /signup
    // Cleanup token so /login redirect is successful
    token && removeJwtToken();
  }, []);

  return (
    <div className="gradient-bg font-open min-h-screen gap-6 flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-center gap-6 px-6">
        <WelcomeElement />
        <div className="p-10 rounded border border-neutral-900 gradient-form">
          <SignUpForm />
          <p className="text-center text-white2 mt-2">
            Already have an account?{" "}
            <span className="text-accent font-bold">
              <a href="/login">Sign in</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
const WelcomeElement = () => {
  return (
    <div className="font-ubuntu-500 flex flex-col gap-6 md:w-1/2">
      <div data-testid="welcome-element" className="text-4xl text-center md:text-left md:text-6xl ">
        <h1>Welcome to</h1>
        <p className="text-yellow">urjourney.</p>
      </div>
      <div className="hidden md:block text-xl font-open w-2/3">
        Join our community of passionate athletes and inspire the world with
        your personal fitness journey!
      </div>
    </div>
  );
};

export default SignUp;

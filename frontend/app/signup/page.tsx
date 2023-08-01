"use client";

import { useEffect } from "react";
import { getJwtToken, removeJwtToken } from "../api/auth/auth_handler";
import SignUpForm from "../components/forms/SignupForm";

const SignUp = () => {
  useEffect(() => {
    const token = getJwtToken();
    // When manually pathing to /signup
    // Cleanup token so /login redirect is successful
    token && removeJwtToken();
  }, []);

  return (
    <div className="home-image min-h-screen">
      <div className="bg-transparent min-h-screen py-8 flex flex-col justify-center">
        <h1
          className="font-bold text-4xl text-green text-center px-6"
          data-testid="welcome-element"
        >
          Welcome to <span>urjourney.</span>
        </h1>
        <SignUpForm />
        <p className="text-center text-grey mt-2">
          Already have an account?{" "}
          <span className="text-green font-bold">
            <a href="/login">Sign in</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

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
      <div className="bg-transparent min-h-screen py-8 flex flex-col justify-center font-open items-center">
        <div
          className="font-bold font-ubuntu-500 text-4xl text-green text-center px-6"
          data-testid="welcome-element"
        >
          <h1>Welcome to</h1>
          <p className="text-yellow">urjourney.</p>
        </div>
        <SignUpForm />
        <p className="text-center text-white2 mt-2">
          Already have an account?{" "}
          <span className="text-yellow font-bold">
            <a href="/login">Sign in</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

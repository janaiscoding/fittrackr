"use client";
import { useEffect } from "react";
import { getJwtToken, removeJwtToken } from "../utils/api/auth/auth_handler";
import SignUpForm from "../components/forms/SignupForm";
import LogoFront from "../utils/assets/LogoFront";
import Footer from "../components/ui_elements/Footer";

const SignUp = () => {
  useEffect(() => {
    const token = getJwtToken();
    // When manually pathing to /signup -  Cleanup token so /login redirect is successful
    if (token) {
      removeJwtToken();
    }
  }, []);

  return (
    <div className="m-auto max-w-5xl h-screen flex flex-col justify-between pt-10">
      <div className="h-screen flex flex-col justify-start md:justify-evenly items-center md:flex-row">
        <LogoFront />
        <div className="flex flex-col items-center justify-between gap-10 py-10 md:border-l md:border-gray-300">
          <div className="flex flex-col items-center justify-between md:p-10">
            <div className="text-center text-accent text-3xl font-ubuntu-500">
              Sign up
            </div>
            <SignUpForm />
            <p className="text-center mt-2">
              Already have an account?{" "}
              <span className="text-accent font-bold">
                <a href="/login">Sign in</a>
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;

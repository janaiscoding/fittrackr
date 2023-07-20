"use client";
import { useState } from "react";
import Logo from "../components/Logo";
import IntroCard from "../components/intro_card/IntroCard";
import LoginForm from "./LoginForm";

const Login = () => {
  const [isShown, setShown] = useState(false);
  return (
    <div className="min-h-screen home-image flex flex-col justify-between items-center">
      <Logo />
      <LoginForm /> 
    </div>
  );
};

export default Login;

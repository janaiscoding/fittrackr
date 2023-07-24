"use client";
import { useState } from "react";
import Logo from "../assets/svgs/Logo";
import IntroCard from "../ui_components/intro_card/IntroCard";
import LoginForm from "./LoginForm";
import { UserContextProvider } from "../context/userContext";

const Login = () => {
  const [isShown, setShown] = useState(false);
  return (
    <UserContextProvider>
    <div className="min-h-screen home-image flex flex-col justify-between items-center">
      <Logo />
      <LoginForm /> 
    </div>
    </UserContextProvider>
  );
};

export default Login;

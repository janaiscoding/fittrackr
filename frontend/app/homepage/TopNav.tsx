"use client";
import { useContext, useState } from "react";
import Logo from "../components/svgs/Logo";
import Notification from "../components/svgs/Notification";

const TopNav = () => {
  // const { userData } = useContext(UserContext);
  return (
    <nav className="flex justify-between items-center py-2 px-6">
      <Logo />
      <Notification />
    </nav>
  );
};

export default TopNav;

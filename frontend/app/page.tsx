"use client";
import { useState } from "react";
import { UserContextProvider } from "./context/userContext";
import BotNav from "./components/bottom_navbar/BotNav";
import TopNav from "./components/top_navbar/TopNav";
import Home from "./main_page/Home";
import IntroCard from "./components/intro_card/IntroCard";

export default function App() {
  const [isShown, setShown] = useState(false);
  return (
    <UserContextProvider>
      <TopNav />
      <Home isShown={isShown} setShown={setShown} />
      <BotNav isShown={isShown} setShown={setShown} />
    </UserContextProvider>
  );
}

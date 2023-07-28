"use client";
import { useState } from "react";
import { UserContextProvider } from "./context/userContext";
import BotNav from "./ui_components/bottom_navbar/BotNav";
import TopNav from "./ui_components/top_navbar/TopNav";
import Home from "./main_page/Home";

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

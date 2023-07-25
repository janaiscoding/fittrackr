"use client";
import { useState } from "react";
import { UserContextProvider } from "./context/userContext";
import App from "./main_page/App";
import BotNav from "./ui_components/bottom_navbar/BotNav";
import TopNav from "./ui_components/top_navbar/TopNav";
import FormPost from "./main_page/FormPost";

export default function Home() {
  const [isShown, setShown] = useState(false);
  return (
    <UserContextProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <TopNav />
          <App isShown={isShown} />
        </div>
        <BotNav isShown={isShown} setShown={setShown} />
      </div>
    </UserContextProvider>
  );
}

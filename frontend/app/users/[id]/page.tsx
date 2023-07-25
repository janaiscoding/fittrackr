"use client";

import TopNav from "@/app/ui_components/top_navbar/TopNav";
import FormPost from "@/app/main_page/FormPost";
import BotNav from "@/app/ui_components/bottom_navbar/BotNav";
import { UserContextProvider } from "@/app/context/userContext";
import { useState } from "react";
import UserPage from "./UserPage";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [isShown, setShown] = useState(false);

  return (
    <UserContextProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <TopNav />
          <UserPage id={id} isShown={isShown}/>
        </div>
        {isShown && <FormPost setShown={setShown} />}
        <BotNav isShown={isShown} setShown={setShown} />
      </div>
    </UserContextProvider>
  );
};

export default Page;

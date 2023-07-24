"use client";
import { UserContextProvider } from "./context/userContext";
import App from "./main_page/App";

export default function Home() {
  return (
    <UserContextProvider>
      <App />
    </UserContextProvider>
  );
}

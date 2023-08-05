import { ModalContextProvider } from "./context/modalContext";
import { PostsContextProvider } from "./context/postsContext";
import { UserContextProvider } from "./context/userContext";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Fiturself",
  description: "Track your milestones, Inspire the world!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <UserContextProvider>
          <PostsContextProvider>
            <ModalContextProvider>{children}</ModalContextProvider>
          </PostsContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}

import { ModalContextProvider } from "./context/modalContext";
import { PostsContextProvider } from "./context/postsContext";
import { UserContextProvider } from "./context/userContext";
import "./globals.css";

export const metadata = {
  title: "fitTrakr",
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

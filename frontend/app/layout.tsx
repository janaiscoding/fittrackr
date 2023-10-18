import { EditContextProvider } from "./context/editContext";
import { ModalContextProvider } from "./context/modalContext";
import { PostsContextProvider } from "./context/postsContext";
import { UserContextProvider } from "./context/userContext";
import { ViewContextProvider } from "./context/viewContext";
import "./globals.css";

export const metadata = {
  title: "fitTrakr • Track your journey!",
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
            <ViewContextProvider>
              <ModalContextProvider>
                <EditContextProvider>{children}</EditContextProvider>
              </ModalContextProvider>
            </ViewContextProvider>
          </PostsContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}

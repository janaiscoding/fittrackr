import { EditContextProvider } from "./context/editContext";
import { ModalContextProvider } from "./context/modalContext";
import { PostsContextProvider } from "./context/postsContext";
import { ThemeContextProvider } from "./context/themeContext";
import { UserContextProvider } from "./context/userContext";
import { ViewContextProvider } from "./context/viewContext";
import "./globals.css";

export const metadata = {
  title: "socializer • Connect with the world!",
  description: "Connect with the world!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className="dark">
      <body className="bg-white dark:bg-stone-950 text-black dark:text-gray-400">
        <UserContextProvider>
          <PostsContextProvider>
            <ViewContextProvider>
              <ModalContextProvider>
                <EditContextProvider>
                  <ThemeContextProvider>{children}</ThemeContextProvider>
                </EditContextProvider>
              </ModalContextProvider>
            </ViewContextProvider>
          </PostsContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}

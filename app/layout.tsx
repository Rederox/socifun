"use client";
import StrapiApolloProvider from "@/graphql/apollo";
import "../styles/globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { UserProvider } from "../contexts/UserProvider";
import { useState } from "react";
import { AvatarContext } from "@/contexts/AvatarContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [avatarProps, setAvatarProps] = useState({});

  return (
    <AvatarContext.Provider value={{ avatarProps, setAvatarProps }}>
      <UserProvider>
        <StrapiApolloProvider>
          <html lang="en">
            <body>
              <Header />
              <div className="bg-[#1a1a2e] flex flex-col py-3 items-center gap-2 md:pt-[7em] pt-[5em]">
                {children}
              </div>
              <Footer />
            </body>
          </html>
        </StrapiApolloProvider>
      </UserProvider>
    </AvatarContext.Provider>
  );
}

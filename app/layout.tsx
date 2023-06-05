"use client";
import StrapiApolloProvider from "@/graphql/apollo";
import "../styles/globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { UserProvider } from "../contexts/UserProvider";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StrapiApolloProvider>
      <UserProvider>
        <html lang="en">
          <body>
            <Header />
            <div className="bg-[#1a1a2e] flex flex-col py-3 items-center gap-2 md:pt-[7em] pt-[5em]">
              {children}
            </div>
            <Footer />
          </body>
        </html>
      </UserProvider>
    </StrapiApolloProvider>
  );
}

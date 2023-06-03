"use client";
import StrapiApolloProvider from "@/graphql/apollo";
import "../styles/globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { UserProvider } from "../contexts/UserProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <StrapiApolloProvider>
        <html lang="en">
          <body>
            <Header />
            <div className="bg-[#1a1a2e] flex flex-col py-3 items-center gap-2 pt-[7em]">
              {children}
            </div>
            <Footer />
          </body>
        </html>
      </StrapiApolloProvider>
    </UserProvider>
  );
}
// pages/_app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css";
import StrapiApolloProvider from "@/graphql/apollo";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrapiApolloProvider>
      <div className="flex flex-col justify-center items-center bg-gray-100 gap-2">
        <Header />
        <Component {...pageProps} />
        <Footer />{" "}
      </div>
    </StrapiApolloProvider>
  );
}

export default MyApp;

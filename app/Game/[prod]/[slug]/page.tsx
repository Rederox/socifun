"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Header from "@/components/Header/Header";
import Style from "../../../../styles/game.module.css"
import {
  SearchBySlugDocument,
  SearchBySlugQuery,
  SearchBySlugQueryVariables,
} from "@/generated";
import StrapiApolloProvider from "@/graphql/apollo";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

interface Props {
  params: {
    prod: string;
    slug: string;
  };
}

const GamePage = (props: Props) => {
  const slug = props.params.slug;
  const prod = props.params.prod;

  const [iframeError, setIframeError] = useState(false);

  const { data, error, loading } = useQuery<
    SearchBySlugQuery,
    SearchBySlugQueryVariables
  >(SearchBySlugDocument, {
    variables: {
      slug: slug?.toString() || "",
    },
  });

  const iframeUrl =
    prod === "CG"
      ? `https://games.crazygames.com/en_US/${slug}/index.html`
      : prod === "GD" && data
        ? `https://html5.gamedistribution.com/${data.gameSearched?.md5}`
        : "";

  const handleIframeError = () => {
    setIframeError(true);
  };

  return (
    <div className="bg-[#406E8E] w-[99%] rounded-md flex flex-col" >

      {iframeError ? (
        // eslint-disable-next-line react/no-unescaped-entities
        <p>Oops! Le jeux n'as pas reussi à se charger .</p>
      ) : iframeUrl ? (
        <>
          <div className=" w-[99%] flex flex-col sm:flex-row items-center justify-evenly p-2">
            <iframe
              id="game-iframe"
              className="flex w-full h-full rounded-md"
              src={iframeUrl}
              title={data?.gameSearched?.title || ""}
              scrolling="no"
              allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write;"
              allowFullScreen
              sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups"
              loading="eager"
              data-hj-allow-iframe="true"
              style={{
                width: "calc((70vw - 60px) - 24px)",
                height: "min((70vh - 60px) - 16px, 56vw)",
              }}
              onError={handleIframeError}
            ></iframe>
            <div
              className="bg-gray-800 m-5 rounded-md text-white"
              style={{
                width: "calc((40vw - 60px) - 24px)",
                height: "min((70vh - 60px) - 16px, 56vw)",
              }}
            >
              test
            </div>
          </div>
          <div>{data?.gameSearched?.instruction}</div>
        </>
      ) : (
        <div><LoadingSpinner /></div>
      )}

    </div>
  );
};

export default GamePage;

/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  SearchBySlugDocument,
  SearchBySlugQuery,
  SearchBySlugQueryVariables,
} from "@/generated";

import LoadingHamster from "@/components/LoadingSpinner/LoadingHamster";
import Link from "next/link";
import { BiFullscreen } from "react-icons/bi";

import { AiFillLike as Like, AiFillDislike as Dislike, AiFillEye as View } from "react-icons/ai"
import { MdOutlineFavorite as Favorite } from "react-icons/md";

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingHamster />
      </div>
    );

  if (error || iframeError)
    return (
      <p className="text-center text-xl text-red-500">
        Oops! Le jeu n'a pas réussi à se charger.
      </p>
    );

  // Function to format date
  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const goFullscreen = () => {
    const iframe = document.getElementById("game-iframe") as HTMLIFrameElement;

    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.requestFullscreen) {
      // Firefox
      iframe.requestFullscreen();
    } else if (iframe.requestFullscreen) {
      // Chrome, Safari and Opera
      iframe.requestFullscreen();
    } else if (iframe.requestFullscreen) {
      // IE/Edge
      iframe.requestFullscreen();
    }
  };

  return (
    <div className="flex w-[99%] rounded-md flex-col items-center justify-center bg-[#2e2e52] p-4">
      <h1 className="text-4xl text-white font-bold mb-4">
        {data?.gameSearched?.title}
      </h1>
      <div className="h-[70vh] w-full lg:w-[90%] rounded-md overflow-hidden my-4 flex flex-col items-end">
        <button
          onClick={goFullscreen}
          className="font-bold text-[30px] absolute text-[#2e2e52]"
        >
          <BiFullscreen />
        </button>

        <iframe
          id="game-iframe"
          className="w-full h-full"
          src={iframeUrl}
          title={data?.gameSearched?.title || ""}
          scrolling="no"
          allow="autoplay; payment; fullscreen; microphone; focus-without-user-activation *; screen-wake-lock; gamepad; clipboard-read; clipboard-write;"
          allowFullScreen
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups"
          loading="eager"
          data-hj-allow-iframe="true"
          onError={handleIframeError}
        ></iframe>
        <div className="flex justify-center items-center gap-4 flex-wrap
        ">
          <div className="flex flex-row items-center justify-center gap-1 text-white"><View className="text-[#1d1dff] text-[26px] cursor-pointer" />1</div>
          <div className="flex flex-row items-center justify-center gap-1 text-white"><Like className="text-[#3474ff] text-[26px] cursor-pointer" />3</div>
          <div className="flex flex-row items-center justify-center gap-1 text-white"><Dislike className="text-[#3474ff] text-[26px] cursor-pointer" />4</div>
          <div className="flex flex-row items-center justify-center gap-1 text-white"><Favorite className="text-[#999999] text-[26px] cursor-pointer" />5</div>
        </div>
      </div>
      <div className="w-full lg:w-[90%] text-white text-lg">
        <div className="my-2">
          <h2 className="text-2xl font-bold mb-2">Description</h2>
          <p className="bg-gray-800 p-4 rounded-md">
            {data?.gameSearched?.description}
          </p>
        </div>
        <div className="my-2">
          <h2 className="text-2xl font-bold mb-2">Instruction</h2>
          <p className="bg-gray-800 p-4 rounded-md">
            {data?.gameSearched?.instruction}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="bg-gray-800 p-4 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10">
            <h2 className="font-bold mb-2 text-xl">Catégories</h2>
            <div className="flex flex-wrap">
              {data?.gameSearched?.categories?.map((category, i) => (
                <Link href={`/Category/${category}`} key={category + i}>
                  <div className="m-1 bg-gray-950 bg-opacity-50 text-white px-2 py-1 rounded-md hover:bg-opacity-75 transition-colors duration-300 ease-in-out">
                    {category}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10">
            <h2 className="font-bold mb-2 text-xl">Entreprise</h2>
            <p>{data?.gameSearched?.company}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10">
            <h2 className="font-bold mb-2 text-xl">Type</h2>
            <p>{`${data?.gameSearched?.type} / ${data?.gameSearched?.subType}`}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-10">
            <h2 className="font-bold mb-2 text-xl">Sortie le</h2>
            <p>{formatDate(data?.gameSearched?.publishedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;

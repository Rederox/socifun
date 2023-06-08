"use client";
import {
  GetTagGamesDocument,
  GetTagGamesQuery,
  GetTagGamesQueryVariables,
} from "@/generated";
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Pagination from "@/components/Pagination/Pagination";
import LoadingPage from "@/app/loading";
import Search from "@/components/Search/Search";

interface Props {
  params: {
    Tag: string;
  };
}

const Tag = (props: Props) => {
  const [hitsPerPage, setHitsPerPage] = useState(16);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, loading, refetch } = useQuery<
    GetTagGamesQuery,
    GetTagGamesQueryVariables
  >(GetTagGamesDocument, {
    variables: {
      visibleFilter: "true",
      hitsPerPage: hitsPerPage,
      page: pageNumber - 1,
      tags: props.params.Tag,
    },
  });

  useEffect(() => {
    refetch();
  }, [pageNumber, refetch]);

  const lastPageNumber = data?.gamesSearched?.nbPages ?? 20;
  console.log(data?.gamesSearched);

  return (
    <div className="w-full  px-2 md:px-2 py-4  bg-[#1a1a2e] flex flex-col gap-3 h-autou ">
      <div className="text-start font-extrabold text-2xl md:text-3xl text-[#cbf7ed]">
        {props.params.Tag ?? "Non Trouvé"}
      </div>
      <div className=" bg-[#2e2e52] rounded-md">
        {loading ? (
          <LoadingPage />
        ) : error ? (
          <div className="flex items-center px-4 py-2 text-red-500">
            {error.message}
          </div>
        ) : data?.gamesSearched.hits ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 py-5">
            {data?.gamesSearched?.hits?.map((hit) => {
              const asset = hit?.assets?.find(
                (res) => res.width === 512 && res.height === 512
              );

              return (
                <div
                  key={hit.objectID}
                  className="flex flex-col items-center p-2 m-4 md:p-4 bg-[#1a1a2e] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
                  onClick={() =>
                    window.open(`/Game/GD/${hit?.slugs?.[0].name}`, "_self")
                  }
                >
                  <div className="relative w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem] transition-transform duration-300 ease-in-out hover:scale-110">
                    <Image
                      src={
                        "https://img.gamedistribution.com/" +
                        (asset?.name ?? hit?.assets?.[0]?.name)
                      }
                      alt={hit?.title ?? "Game image"}
                      className="rounded-lg"
                      width={asset?.width ?? 512}
                      height={asset?.height ?? 512}
                    />
                  </div>
                  <h3 className="mt-2 text-center text-gray-100 font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl transition-colors duration-300 ease-in-out hover:text-white">
                    {hit?.title}
                  </h3>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Une erreur est survenue</div>
        )}
      </div>
      <div
        id="page"
        className="mt-6 w-full flex justify-center items-center gap-3"
      >
        <Pagination
          currentPage={pageNumber}
          lastPage={lastPageNumber}
          maxLength={7}
          setCurrentPage={setPageNumber}
        />
      </div>
    </div>
  );
};

export default Tag;

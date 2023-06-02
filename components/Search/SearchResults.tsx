import React, { useState } from "react";
import {
  GetCategoryDocument,
  GetGameDataDocument,
  GetGameDataQuery,
  GetGameDataQueryVariables,
} from "@/generated";
import { empty, gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import Link from "next/link";

interface SearchResultsProps {
  searchTerm: string;
  filterTerm: string;
}

function SearchResults({ searchTerm, filterTerm }: SearchResultsProps) {
  const { data, error, loading, refetch } = useQuery<
    GetGameDataQuery,
    GetGameDataQueryVariables
  >(GetGameDataDocument, {
    variables: {
      visibleFilter: "true",
      search: searchTerm,
      hitsPerPage: 10,
      categories: filterTerm.length > 0 ? [filterTerm] : [],
    },
  });

  React.useEffect(() => {
    refetch();
  }, [searchTerm, filterTerm, refetch]);
  const [isImageLoaded, setImageLoaded] = React.useState(false);
  return (
    <div className="bg-[#2e2e52] w-[99%] rounded-md flex flex-wrap p-2  flex-col items-center justify-center">
      {loading ? (
        <div className="w-full text-center">
          <BeatLoader color="#0000FF" />
        </div>
      ) : error ? (
        <div className="flex flex-start">{error.message}</div>
      ) : data?.gamesSearched?.hits && data.gamesSearched.hits.length > 0 ? (
        <>
          {data?.gamesSearched?.hits?.map((hit) => {
            const asset = hit?.assets?.find(
              (res) => res.width === 512 && res.height === 512
            );

            return (
              <div
                key={hit.objectID}
                className="flex flex-col px-2 py-1 w-full "
              >
                <div className="flex md:gap-[3rem] items-center justify-center flex-col md:flex-row">
                  <div
                    className="flex items-center rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-[10rem] h-[10rem] md:w-[12rem] md:h-[12rem]"
                    onClick={() =>
                      window.open(`Game/GD/${hit?.slugs?.[0].name}`, "_self")
                    }
                  >
                    <Image
                      src={
                        "https://img.gamedistribution.com/" +
                        (asset?.name ?? hit?.assets?.[0]?.name)
                      }
                      alt={hit?.title ?? "Game image"}
                      width={asset?.width ?? 512}
                      height={asset?.height ?? 512}
                      loading="lazy"
                      onLoad={() => setImageLoaded(true)}
                      className={`rounded-lg ${
                        isImageLoaded ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-500`}
                    />
                  </div>
                  <div className="md:w-[80%] ">
                    <div
                      id="title"
                      className="flex flex-col md:flex-row gap-2 items-center justify-between"
                    >
                      <div className="p-2 text-[#cbf7ed] text-[1.5rem] font-medium rounded-b-lg font-sans">
                        {hit?.title}
                      </div>
                      <div className="flex flew-col gap-3 flex-wrap">
                        {hit?.categories?.map((category, i) => {
                          return (
                            <Link
                              key={category + i}
                              className="bg-gray-950 bg-opacity-50 text-white flex items-center justify-center p-1 h-[10%] rounded-md hover:bg-opacity-75 transition-colors duration-300 ease-in-out"
                              href={"Category/" + category}
                            >
                              {category}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <div className="p-2 text-[#cbf7ed] text-[0.8rem] md:text-[1rem] font-medium rounded-b-lg font-sans text-justify">
                      {hit?.description}
                    </div>
                    <div className="flex flew-col gap-3 flex-wrap items-center p-2">
                      <span className="text-[#cbf7ed]">Tags :</span>
                      {hit?.tags?.map((tag, i) => {
                        if (tag.includes("#")) {
                          tag = tag.replace("#", "");
                        }
                        return (
                          <Link
                            key={tag + i}
                            className="bg-slate-700 bg-opacity-25 text-white flex items-center justify-center p-1 h-[10%] rounded-md hover:bg-opacity-50 transition-colors duration-300 ease-in-out"
                            href={"/Tag/" + tag}
                          >
                            {tag}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <hr className="m-5" />
              </div>
            );
          })}
        </>
      ) : (
        <div className="flex items-center px-4 py-2 text-white">
          Aucun Resultat
        </div>
      )}
    </div>
  );
}

export default SearchResults;

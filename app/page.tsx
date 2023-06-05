"use client";
import Search from "@/components/Search/Search";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import GameCategory from "@/components/GameCategory/GameCategory";
import LoadingPage from "./loading";
import { useQuery } from "@apollo/client";
import {
  GetGameDataDocument,
  GetGameDataQuery,
  GetGameDataQueryVariables,
} from "@/generated";

export default function Home() {
  const [areCategoriesLoaded, setCategoriesLoaded] = useState(false);

  const {
    data: dataAdventure,
    loading: loadingAdventure,
    error: errorAdventure,
  } = useQuery<GetGameDataQuery, GetGameDataQueryVariables>(
    GetGameDataDocument,
    {
      variables: {
        visibleFilter: "true",
        search: "",
        hitsPerPage: 10,
        categories: "Adventure",
      },
    }
  );

  const {
    data: dataArcade,
    loading: loadingArcade,
    error: errorArcade,
  } = useQuery<GetGameDataQuery, GetGameDataQueryVariables>(
    GetGameDataDocument,
    {
      variables: {
        visibleFilter: "true",
        search: "",
        hitsPerPage: 10,
        categories: "Arcade",
      },
    }
  );

  const {
    data: dataMultiplayer,
    loading: loadingMultiplayer,
    error: errorMultiplayer,
  } = useQuery<GetGameDataQuery, GetGameDataQueryVariables>(
    GetGameDataDocument,
    {
      variables: {
        visibleFilter: "true",
        search: "",
        hitsPerPage: 10,
        categories: "Multiplayer",
      },
    }
  );

  useEffect(() => {
    if (
      !loadingAdventure &&
      !loadingArcade &&
      !loadingMultiplayer &&
      !errorAdventure &&
      !errorArcade &&
      !errorMultiplayer
    ) {
      setCategoriesLoaded(true);
    }
  }, [
    loadingAdventure,
    loadingArcade,
    loadingMultiplayer,
    errorAdventure,
    errorArcade,
    errorMultiplayer,
  ]);

  return (
    <div className="flex flex-col items-center gap-3 w-[99%] h-screen">
      <Search />
      {areCategoriesLoaded ? (
        <>
          <GameCategory category="Adventure" data={dataAdventure} />
          <GameCategory category="Arcade" data={dataArcade} />
          <GameCategory category="Multiplayer" data={dataMultiplayer} />
        </>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}

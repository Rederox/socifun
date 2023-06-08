import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";

import {
  GetRandomGameDocument,
  GetRandomGameQuery,
  GetRandomGameQueryVariables,
} from "@/generated";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function useRandomGame() {
  const getRandomNumber = (max: number) => Math.floor(Math.random() * max) + 1;
  const [RandomNum, setRandomNum] = useState(getRandomNumber(18854));

  const { data, loading, error, refetch } = useQuery<
    GetRandomGameQuery,
    GetRandomGameQueryVariables
  >(GetRandomGameDocument, {
    variables: {
      visibleFilter: "true",
      hitsPerPage: 1,
      page: RandomNum,
    },
  });

  const refetchRandomGame = () => {
    setRandomNum(getRandomNumber(18854));
    refetch();
  };

  return { data, loading, error, refetchRandomGame };
}

function Random() {
  const [slug, setSlug] = useState<string | null>(null);
  const { data, loading, error, refetchRandomGame } = useRandomGame();

  useEffect(() => {
    if (data && !loading) {
      if (data.gamesSearched?.hits?.[0]?.slugs?.[0]?.name) {
        setSlug(data.gamesSearched.hits[0].slugs[0].name);
      } else {
        refetchRandomGame();
      }
    } else if (error) {
      refetchRandomGame();
    }
  }, [data, loading, error, refetchRandomGame]);

  const handleClick = () => {
    if (slug) {
      window.open(`/Game/GD/${slug}`, "_self");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <button
      onClick={handleClick}
      className="bg-white text-gray-800 py-2 px-4 rounded-lg md:flex items-center flex-col hidden"
    >
      <Image src="/mystery.svg" alt="Bouton Mystere" width={30} height={30} />
      Aléatoire
    </button>
  );
}

export default Random;

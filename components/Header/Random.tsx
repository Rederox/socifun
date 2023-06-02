import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

import {
  GetRandomGameDocument,
  GetRandomGameQuery,
  GetRandomGameQueryVariables,
} from "@/generated";

function Random() {
  function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }

  const [RandomNum, setRandomNum] = useState(getRandomNumber(10000));
  const [slug, setSlug] = useState<string | null>(null);

  const { data, error, loading, refetch } = useQuery<
    GetRandomGameQuery,
    GetRandomGameQueryVariables
  >(GetRandomGameDocument, {
    variables: {
      visibleFilter: "true",
      hitsPerPage: 1,
      page: RandomNum,
    },
  });

  useEffect(() => {
    if (data && data.gamesSearched?.hits?.[0]?.slugs?.[0]?.name) {
      setSlug(data.gamesSearched.hits[0].slugs[0].name);
    }
  }, [data]);

  const handleClick = () => {
    if (slug) {
      window.open(`/Game/GD/${slug}`, "_self");
    } else {
      setRandomNum(getRandomNumber(18854));
      refetch();
    }
  };

  if (error) {
    console.log(error);
    setRandomNum(getRandomNumber(18854));
    refetch();
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

"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Profil from "./userMenu";
import LikeList from "./LikeList";
import Random from "./Random";
import Link from "next/link";
import { UserContext } from "@/contexts/UserProvider";
import { getFavoriteGames } from "../Game/gameFunction";
import { supabase } from "@/lib/supabaseClient";

interface Game {
  id: number;
  name: string;
  image: string;
  slug: string;
}

const Header = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Header component must be used within a UserProvider");
  }

  const { user, setUser, loading } = context;

  const [likedGames, setLikedGames] = useState<Game[]>([]);

  useEffect(() => {
    const favorite = async () => {
      if (user) {
        const result = await getFavoriteGames(user?.id);
        const transformedData = result.map((game) => {
          const gameData = game.games as {
            title: string;
            slug: string;
            md5: string;
          };
          return {
            id: game.id_game,
            name: gameData.title,
            image: `https://img.gamedistribution.com/${gameData.md5}-512x512.jpeg`,
            slug: gameData.slug,
          };
        });

        setLikedGames(transformedData);
      }
    };
    favorite();
    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "favorite",
        },
        (payload) => {
          favorite();
        }
      )
      .subscribe();
  }, [user]);

  return (
    <header className="bg-[#21243d] backdrop-filter backdrop-blur-lg text-white py-4 px-6 m-0 w-full z-50 fixed flex justify-between items-center md:h-[105px] h-[75px]">
      {/* Logo + Titre */}
      <Link href={"/"} className="hidden md:block">
        <Image src={"/logoFull.svg"} alt={""} width={170} height={0} />
      </Link>
      <Link href={"/"} className="block md:hidden">
        <Image src={"/logoSingle.svg"} alt={""} width={25} height={0} />
      </Link>
      {/* Bouton milieu Mystere */}
      <div className="mr-[76px]">
        <Random />
      </div>
      {/* Likelist + Profil */}
      <div className="flex items-center justify-center space-x-4">
        {user ? (
          <LikeList
            games={likedGames}
            setLikedGames={setLikedGames}
            loading={loading}
          />
        ) : (
          <></>
        )}
        <Profil />
      </div>
    </header>
  );
};

export default Header;

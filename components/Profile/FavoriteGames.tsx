import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "@/contexts/UserProvider";
import { getFavoriteGames, removeFavorite } from "../Game/gameFunction";
import { supabase } from "@/lib/supabaseClient";

interface Game {
  id: number;
  name: string;
  image: string;
  slug: string;
}

function FavoriteGames() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Header component must be used within a UserProvider");
  }

  const { user, setUser, loading: userLoading } = context;

  const [FavoriteGames, setFavoriteGames] = useState<Game[]>([]);

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

        setFavoriteGames(transformedData);
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

  const handleRemoveGame = async (gameId: number) => {
    // Supprimer le jeu de l'état local
    setFavoriteGames(FavoriteGames.filter((game) => game.id !== gameId));
    try {
      if (user) {
        await removeFavorite(user?.id, gameId);
        console.log(`Game with ID ${gameId} was removed from favorites`);
      }
    } catch (error) {
      console.error("Failed to delete game from favorites", error);
    }
  };

  if (userLoading) {
    return <p>Loading...</p>; // You can customize this to be a loading spinner or whatever you prefer.
  }

  return (
    <div className="flex items-start justify-center flex-col">
      <h1 className="text-white font-extrabold text-[30px] pl-10">
        Les jeux Favoris
      </h1>

      <div className="flex flex-wrap justify-center gap-10 p-10">
        {FavoriteGames.map((game) => (
          <div
            key={game.id}
            className=" w-[8rem] h-[8rem] md:w-[14rem] md:h-[14rem] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <button
              className="absolute top-0 right-0 z-10 text-gray-400 text-xl md:text-xl m-1 hover:text-red-500 bg-gray-800 bg-opacity-50 rounded-full"
              onClick={() => handleRemoveGame(game.id)}
            >
              <AiOutlineClose />
            </button>
            <div
              className="rounded-lg cursor-pointer"
              onClick={() => window.open(`/Game/GD/${game.slug}`, "_self")}
            >
              <Image
                src={game.image}
                alt={game.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-lg"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-800 bg-opacity-70 text-white text-center text-xs md:text-sm font-medium rounded-b-lg">
              {game.name}
            </div>
          </div>
        ))}
        {FavoriteGames.length === 0 && (
          <div className="px-4 py-2 text-red-500 flex items-center justify-center">
            Aucun jeu aimé pour le moment
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteGames;

import Image from "next/image";
import React, { useState, useEffect, useRef, useContext } from "react";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { removeFavorite } from "../Game/gameFunction";
import { UserContext } from "@/contexts/UserProvider";

interface Game {
  id: number;
  name: string;
  image: string;
  slug: string;
}

interface LikeListProps {
  games: Game[];
  setLikedGames: React.Dispatch<React.SetStateAction<Game[]>>;
  loading: boolean;
}

const LikeList: React.FC<LikeListProps> = ({
  games,
  setLikedGames,
  loading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Header component must be used within a UserProvider");
  }

  const { user, setUser, loading: userLoading } = context;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  if (loading) {
    return <p>Loading...</p>; // You can customize this to be a loading spinner or whatever you prefer.
  }

  const handleRemoveGame = async (gameId: number) => {
    // Supprimer le jeu de l'état local
    setLikedGames(games.filter((game) => game.id !== gameId));
    try {
      if (user) {
        await removeFavorite(user?.id, gameId);
        console.log(`Game with ID ${gameId} was removed from favorites`);
      }
    } catch (error) {
      console.error("Failed to delete game from favorites", error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="text-gray-800 py-2 px-0 rounded-lg focus:outline-none"
        onClick={toggleMenu}
      >
        <AiFillHeart className="text-red-500 h-6 w-6" />
      </button>
      {isOpen && (
        <div className="absolute -right-[4rem] mt-2 w-[18rem] md:w-[29rem] max-h-[29rem] bg-gray-900 border border-gray-800 rounded-md shadow-xl z-10 overflow-x-auto">
          <div className="flex flex-wrap justify-center">
            {games.map((game) => (
              <div
                key={game.id}
                className="flex items-center px-4 py-2 md:w-1/3"
              >
                <div className="relative w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                  <button
                    className="absolute top-0 right-0 z-10 text-gray-400 text-xl md:text-xl m-1 hover:text-red-500 bg-gray-800 bg-opacity-50 rounded-full"
                    onClick={() => handleRemoveGame(game.id)}
                  >
                    <AiOutlineClose />
                  </button>
                  <div
                    className="rounded-lg cursor-pointer"
                    onClick={() =>
                      window.open(`/Game/GD/${game.slug}`, "_self")
                    }
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
              </div>
            ))}
            {games.length === 0 && (
              <div className="px-4 py-2 text-red-500 flex items-center justify-center">
                Aucun jeu aimé pour le moment
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeList;

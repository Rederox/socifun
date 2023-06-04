"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Profil from "./userMenu";
import LikeList from "./LikeList";
import Random from "./Random";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContextProps";

const Header = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MyComponent must be used within a UserProvider");
  }
  const { user, setUser } = context;
  const [likedGames, setLikedGames] = useState([
    {
      id: "e063dd2a16cb46fe871e4199007a8b24",
      name: "IDLE MINER SPACE RUSH",
      image: "/avatar.jpg",
    },
    {
      id: "e063dd2a16cb46fe871e4199007a8b22",
      name: "Game B",
      image: "/avatar.jpg",
    },
  ]);
  return (
    <header className="bg-[#21243d] backdrop-filter backdrop-blur-lg text-white py-4 px-6 m-0 w-full z-50 fixed flex justify-between items-center">
      {/* Logo + Titre */}
      <Link href={"/"}>
        <h1 className="text-xl font-bold">SociFun</h1>
      </Link>
      {/* Bouton milieu Mystere */}
      <div>
        <Random />
      </div>
      {/* Likelist + Profil */}
      <div className="flex items-center space-x-4">
        {user ? (
          <LikeList games={likedGames} setLikedGames={setLikedGames} />
        ) : (
          <></>
        )}
        <Profil />
      </div>
    </header>
  );
};

export default Header;

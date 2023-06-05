"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Profil from "./userMenu";
import LikeList from "./LikeList";
import Random from "./Random";
import Link from "next/link";
import { UserContext } from "@/contexts/UserProvider";

const Header = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Header component must be used within a UserProvider");
  }

  const { user, setUser, loading } = context;

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
    <header className="bg-[#21243d] backdrop-filter backdrop-blur-lg text-white py-4 px-6 m-0 w-full z-50 fixed flex justify-between items-center md:h-[105px] h-[75px]">
      {/* Logo + Titre */}
      <Link href={"/"} className="hidden md:block">
        <Image src={"/logoFull.svg"} alt={""} width={170} height={0} />
      </Link>
      <Link href={"/"} className="block md:hidden">
        <Image src={"/logoSingle.svg"} alt={""} width={25} height={0} />
      </Link>
      {/* Bouton milieu Mystere */}
      <div>
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

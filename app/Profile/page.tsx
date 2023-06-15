/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useContext, useState } from "react";
import { generateRandomAvatar } from "@/components/Avatar/RandomAvatar";
import { Avatar } from "@bigheads/core";
import { UserContext } from "@/contexts/UserProvider";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

import Profile from "@/components/Profile/Profile";
import LoadingHamster from "@/components/LoadingSpinner/LoadingHamster";
import FavoriteGames from "@/components/Profile/FavoriteGames";

const ProfilePage = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("ProfilePage must be used within a UserProvider");
  }
  const { user, loading } = context;

  const [avatarProps, setAvatarProps] = useState(generateRandomAvatar());

  const regenerateAvatar = () => {
    setAvatarProps(generateRandomAvatar());
  };

  if (loading) {
    return (
      <div className="flex w-[99%] h-screen rounded-md flex-col items-center justify-center bg-[#2e2e52] p-4">
        <LoadingHamster />
      </div>
    );
  }
  console.log(avatarProps);

  return (
    <div className="flex w-[99%] h-[100%] rounded-md flex-col items-center  bg-[#2e2e52] p-4 gap-3">
      <div className="w-[99%] flex gap-3 flex-col">
        {user ? (
          <>
            <Profile />
            <div className="flex  bg-[#1a1a2e] p-4 rounded-md">
              <FavoriteGames />
            </div>
          </>
        ) : (
          <div className="h-screen flex items-center justify-center font-extrabold text-2xl text-[#ff0000]">
            Vous n'êtes pas connecté
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

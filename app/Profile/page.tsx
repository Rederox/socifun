/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useContext, useState } from "react";
import { generateRandomAvatar } from "@/components/Avatar/RandomAvatar";
import { Avatar } from "@bigheads/core";
import { UserContext } from "@/contexts/UserProvider";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

import Profile from "@/components/Profile/Profile";
import LoadingHamster from "@/components/LoadingSpinner/LoadingHamster";

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
    <div className="flex w-[99%] h-screen rounded-md flex-col items-center  bg-[#2e2e52] p-4">
      <div className="w-[99%]">
        {user ? (
          <>
            <Profile />
          </>
        ) : (
          <>Vous n'êtes pas connecté</>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

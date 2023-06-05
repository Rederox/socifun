/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useContext, useState } from "react";
import { generateRandomAvatar } from "@/components/Avatar/RandomAvatar";
import { Avatar } from "@bigheads/core";
import { UserContext } from "@/contexts/UserProvider";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

import Profile from "@/components/Profile/Profile";

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
    return <LoadingSpinner />;
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

        <div className="w-[200px] h-[200px]">
          <Avatar {...avatarProps} />
        </div>
        <button
          onClick={regenerateAvatar}
          className="bg-blue-400 rounded-md p-4"
        >
          Regenerate Avatar
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

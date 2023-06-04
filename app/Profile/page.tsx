"use client";
import React, { useContext, useEffect } from "react";
import RandomAvatar from "@/components/Avatar/RandomAvatar";
import { Avatar } from "@bigheads/core";
import { UserContext } from "@/contexts/UserContextProps";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { AvatarContext } from "@/contexts/AvatarContext";
import Profile from "@/components/Profile/Profile";

const ProfilePage = () => {

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MyComponent must be used within a UserProvider");
  }
  const { user, setUser } = context;
  const { avatarProps } = useContext(AvatarContext);

  return (
    <div>
      {
        user ? (
          <><RandomAvatar /><Profile bannerUrl={"/avatar.jpg"} avatarUrl={"/avatar.jpg"} username={"test"} fullName={"test tset"} /></>
        ) : (
          <>
            <LoadingSpinner />
          </>)
      }


    </div>
  );
};

export default ProfilePage;

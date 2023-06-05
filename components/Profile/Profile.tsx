/* eslint-disable @next/next/no-img-element */
import { UserContext } from "@/contexts/UserProvider";
import { supabase } from "@/lib/supabaseClient";
import { Avatar } from "@bigheads/core";
import Image from "next/image";

import React, { useContext, useEffect, useState } from "react";

const Profile: React.FC = () => {
  type Profile = {
    avatar_url: string;
    avatarMode: string;
    username: string;
    full_name: string;
  } | null;
  const [profile, setProfile] = useState<Profile>(null);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Profil component must be used within a UserProvider");
  }

  const { user, setUser, loading } = context;

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url, avatarMode, username, full_name")
          .eq("id", user?.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setProfile(data);
        }
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <div className="bg-gray-900 text-white rounded-[8px]">
      <div className="bg-gray-800 flex items-center justify-center rounded-[8px]">
        <Image
          src={"/bannerCrop.jpg"}
          alt={"banniere"}
          width={970}
          height={250}
          className=" object-fill w-full rounded-[8px]"
        />
      </div>
      <div className="flex items-center md:justify-center md:-mt-16 mt-2 rounded-sm md:flex-col gap-2">
        <div className="md:w-32 md:h-32 w-16 h-16 rounded-full md:border-4 border-2 border-[#1a1a2e] bg-[#2e2e52] overflow-hidden">
          {user ? (
            profile?.avatarMode === "image" ? (
              <Image
                src={profile?.avatar_url}
                alt={"Profile"}
                width={128}
                height={128}
                className="object-cover rounded-full"
              />
            ) : profile?.avatar_url ? (
              <Avatar
                {...JSON.parse(profile.avatar_url)}
                className="rounded-full"
              />
            ) : (
              <></>
            )
          ) : (
            <Image
              src={"/assets/login.svg"}
              alt={"Profile"}
              width={128}
              height={128}
              className="object-cover rounded-full"
            />
          )}
        </div>
        <h1 className="md:text-3xl font-bold">{profile?.full_name}</h1>
      </div>
      <div className="md:text-center mt-4">
        <h1 className="text-3xl font-bold">{profile?.username}</h1>
      </div>
    </div>
  );
};

export default Profile;

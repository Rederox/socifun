import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import AuthComp from "../Auth/Auth";
import { supabase } from "@/lib/supabaseClient";
import { UserContext } from "@/contexts/UserProvider";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Avatar } from "@bigheads/core";
import Link from "next/link";

const Profil = () => {
  const [isOpen, setIsOpen] = useState(false);

  type Profile = {
    avatar_url: string;
    avatarMode: string;
  } | null;
  const [profile, setProfile] = useState<Profile>(null);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Profil component must be used within a UserProvider");
  }

  const { user, setUser, loading } = context;

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

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

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url, avatarMode")
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative" ref={menuRef}>
      <div className="w-10 h-10 rounded-full overflow-hidden border bg-[#2e2e52]">
        {user ? (
          profile?.avatarMode === "image" ? (
            <Image
              src={profile?.avatar_url}
              alt={"Profile"}
              width={100}
              height={100}
              className="object-cover w-full h-full cursor-pointer"
              onClick={toggleMenu}
            />
          ) : profile?.avatar_url ? (
            <Avatar
              {...JSON.parse(profile.avatar_url)}
              onClick={toggleMenu}
              className="cursor-pointer"
            />
          ) : (
            <></>
          )
        ) : (
          <Image
            src={"/assets/login.svg"}
            alt={"Profile"}
            width={100}
            height={100}
            className="object-cover w-full h-full cursor-pointer"
            onClick={toggleMenu}
          />
        )}
      </div>
      {isOpen && (
        <div className="absolute -right-[1.5rem] md:right-0  mt-4 py-2 w-[100vw] md:w-[35vw] bg-slate-800 border-white border rounded-md shadow-xl z-[100]">
          {user ? (
            <>
              <button
                onClick={handleSignOut}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Sign Out
              </button>
              <Link href={"/Profile"}>
                <h1 className="text-sm font-bold">Profile</h1>
              </Link>
            </>
          ) : (
            <AuthComp />
          )}
        </div>
      )}
    </div>
  );
};

export default Profil;

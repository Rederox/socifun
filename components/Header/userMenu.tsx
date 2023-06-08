import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import AuthComp from "../Auth/Auth";
import { supabase } from "@/lib/supabaseClient";
import { UserContext } from "@/contexts/UserProvider";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Avatar } from "@bigheads/core";
import Link from "next/link";
import { FaUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";

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
    location.host;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="focus:outline-none">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-800 bg-gray-800 text-white">
          {user ? (
            profile?.avatarMode === "image" ? (
              <Image
                src={profile?.avatar_url}
                alt={"Profile"}
                width={100}
                height={100}
                className="object-cover w-full h-full cursor-pointer"
              />
            ) : profile?.avatar_url ? (
              <Avatar
                {...JSON.parse(profile.avatar_url)}
                className="cursor-pointer"
              />
            ) : (
              <FaUserCircle size="100%" />
            )
          ) : (
            <FaUser size="100%" />
          )}
        </div>
      </button>
      {isOpen && (
        <>
          {user ? (
            <div className="absolute -right-1 md:right-0 mt-4 w-60 bg-gray-900 shadow-lg rounded-lg z-50 overflow-hidden transition-transform transform scale-95 duration-200 ease-out">
              <div className="flex flex-col items-start space-y-1 px-4 py-2">
                <Link href={"/Profile"}>
                  <div className="flex items-center text-sm font-bold text-gray-300 hover:text-blue-500">
                    <FaUser size="1.2em" className="mr-2" /> Profile
                  </div>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-sm font-bold text-gray-300 hover:text-red-500"
                >
                  <FaSignOutAlt size="1.2em" className="mr-2" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="absolute -right-1 md:right-0 mt-4 w-auto bg-gray-900 shadow-lg rounded-lg z-50 overflow-hidden transition-transform transform scale-95 duration-200 ease-out">
              <AuthComp />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profil;

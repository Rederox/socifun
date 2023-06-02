import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import AuthComp from "../Auth/Auth";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { Session } from "inspector";
import { UserContext } from "@/contexts/UserContextProps";

const Profil: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MyComponent must be used within a UserProvider");
  }
  const { user, setUser } = context;

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const session = async () => {
      const { data, error } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
    };

    session();
  }, [setUser]);

  console.log(user);
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image
          src={user ? "/avatar.jpg" : "/assets/login.svg"}
          alt={"Profile"}
          width={100}
          height={100}
          className="object-cover w-full h-full cursor-pointer"
          onClick={toggleMenu}
        />
      </div>
      {isOpen && (
        <div className="absolute -right-[1.5rem] md:right-0  mt-4 py-2 w-[100vw] md:w-[35vw] bg-slate-800 border-white border rounded-md shadow-xl z-[100]">
          {user ? (
            <button
              onClick={handleSignOut}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Sign Out
            </button>
          ) : (
            <AuthComp />
          )}
        </div>
      )}
    </div>
  );
};

export default Profil;

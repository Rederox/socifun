import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContextProps";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data.user ?? null);
    };

    session();
  }, [setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

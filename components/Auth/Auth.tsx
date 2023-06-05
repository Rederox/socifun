import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserProvider";
import { supabase } from "@/lib/supabaseClient";
import { AnimatePresence, motion } from "framer-motion";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthComp: React.FC = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("AuthComp must be used within a UserProvider");
  }

  const { setUser } = context;
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser]);

  const variants = {
    hidden: { x: "100%" },
    visible: { x: "0" },
    exit: { x: "-100%" },
  };

  return (
    <div className="flex items-center justify-center bg-[#21243d] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AnimatePresence mode="wait">
        {isRegistering ? (
          <SignUp
            key="SignUp"
            variants={variants}
            setIsRegistering={setIsRegistering}
          />
        ) : (
          <SignIn
            key="SignIn"
            variants={variants}
            setIsRegistering={setIsRegistering}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthComp;

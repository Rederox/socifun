/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { UserContext } from "@/contexts/UserContextProps";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import "../../styles/Auth.css";

const AuthComp: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("AuthComp must be used within a UserProvider");
  }

  const { user, setUser } = context;
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (error) {
      console.error("Error: ", error.message);
    }
  };

  const loginGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error: ", error.message);
    }
  };

  const handleForgotPassword = () => {
    setIsResettingPassword(true);
  };

  const handlePasswordReset = async () => {
    if (!username) {
      console.error("Error: Email field must be filled out.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(username);

    if (error) {
      console.error("Error: ", error.message);
    } else {
      console.log("Password reset email sent.");
      setIsResettingPassword(false); // Reset the state after sending the email
    }
  };

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email: username,
      password,
    });

    if (error) {
      console.error("Error: ", error.message);
    } else {
      alert("A confirmation email has been sent to your email address.");
      setIsRegistering(false);
    }
  };

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
    login: { x: 0, transition: { type: "spring", stiffness: 100 } },
    register: { x: "0%", transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="flex items-center justify-center bg-[#21243d] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AnimatePresence>
        <motion.div
          initial={{ x: isRegistering ? "100%" : "100%" }}
          animate={isRegistering ? variants.register : variants.login}
          exit={{ x: isRegistering ? "100%" : "100%" }}
          className="max-w-md w-full space-y-8 bg-[#2e2e52] p-10 rounded-xl shadow-lg"
        >
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              {isResettingPassword
                ? "Réinitialiser votre mot de passe"
                : isRegistering
                ? "Créez votre compte"
                : "Connectez-vous à votre compte"}
            </h2>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative py-2">
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="input-field appearance-none block w-full px-3 py-2 bg-transparent rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="email-address" className="label-field">
                Adresse e-mail
              </label>
            </div>
            {!isResettingPassword && (
              <div className="relative py-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field appearance-none block w-full px-3 py-2 bg-transparent rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password" className="label-field">
                  Mot de passe
                </label>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={
                isResettingPassword
                  ? handleForgotPassword
                  : isRegistering
                  ? handleRegister
                  : login
              }
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
            >
              {isResettingPassword
                ? "Réinitialiser le mot de passe"
                : isRegistering
                ? "S'inscrire"
                : "Se connecter"}
            </button>
            <button
              onClick={loginGoogle}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
            >
              <Image
                src={"/assets/google.svg"}
                alt={"Google Login"}
                width={30}
                height={30}
              />
            </button>
          </div>
          {isResettingPassword ? (
            <button
              className="underline text-indigo-500"
              onClick={() => setIsResettingPassword(false)}
            >
              Se connecter
            </button>
          ) : isRegistering ? (
            <button
              className="underline text-indigo-500"
              onClick={() => setIsRegistering(false)}
            >
              Se connecter
            </button>
          ) : (
            <div className="flex justify-between">
              <button
                className="underline text-indigo-500"
                onClick={() => setIsRegistering(true)}
              >
                S'inscrire
              </button>
              <button
                className="underline text-indigo-500"
                onClick={() => setIsResettingPassword(true)}
              >
                Mot de passe oublié?
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthComp;

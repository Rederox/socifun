/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import "../../styles/Auth.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type SignInProps = {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
  variants: Variants;
};

const SignIn: React.FC<SignInProps> = ({ setIsRegistering, variants }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });
    setIsLoading(false);
    if (error) {
      setErrorMessage(error.message);
    }
  };

  const loginGoogle = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setIsLoading(false);
    if (error) {
      setErrorMessage(error.message);
    }
  };

  const resetPassword = async () => {
    if (!username) {
      setErrorMessage("Veuillez entrer votre adresse e-mail.");
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(username, {
      redirectTo: 'http://localhost:3000/Profile',
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("Un e-mail de réinitialisation a été envoyé.");
    }
  };

  return (
    <motion.div
      variants={variants}
      className="max-w-md w-full space-y-8 bg-[#2e2e52] p-10 rounded-xl shadow-lg"
    >
      {showResetPasswordForm ? (
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-[1.5em] font-bold">Réinitialiser le mot de passe</h1>
          <p className="text-sm mb-4">Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.</p>
          <div className="form__group field">
            <input
              id="reset-email"
              name="resetEmail"
              type="email"
              required
              className="form__field"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="reset-email" className="form__label">
              Adresse e-mail
            </label>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
          )}
          <button onClick={resetPassword} className="group relative w-full flex h-[4vh] justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4">
            {isLoading ? (
              <div><LoadingSpinner /></div>
            ) : (
              'Envoyer'
            )}
          </button>
          <div className="flex row gap-2 items-center">
            <button className="signButton" onClick={() => (setShowResetPasswordForm(false), setErrorMessage(""))}>
              Se connecter
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center font-bold text-[2em]">
            <h1>Connectez-Vous</h1>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="form__group field">
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="form__field"
                placeholder=" "
                onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor="email-address" className="form__label">
                Adresse e-mail
              </label>
            </div>
            <div className="form__group field">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="form__field"
                placeholder=" "
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="form__label">
                Mot de passe
              </label>
              <button
                onClick={() => setShowResetPasswordForm(true)}
                className="text-sm text-blue-500"
              >
                Mot de passe oublié?
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={login}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
            >
              {isLoading ? (
                <div className="w-[30px]"><LoadingSpinner /></div>
              ) : (
                'Se connecter'
              )}
            </button>
            {errorMessage && (
              <p className="text-[#c72727] text-xs mt-2">{errorMessage}</p>
            )}
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-[100%] h-px my-8 bg-[#9b9b9b] border-0 "></hr>
              <span className="absolute px-3 font-medium text-[#9b9b9b] -translate-x-1/2 bg-[#2e2e52] left-1/2 ">
                OU
              </span>
            </div>
            <button onClick={loginGoogle} className="group relative w-full flex justify-center py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4">
              <Image
                src={"/assets/google.svg"}
                alt={"Google Login"}
                width={30}
                height={30}
              />
            </button>
          </div><div className="flex row gap-2 items-center">
            <p className="text-sm font-medium">Vous n'avez pas de compte?</p>
            <button className="signButton" onClick={() => setIsRegistering(true)}>
              S'inscrire
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default SignIn;

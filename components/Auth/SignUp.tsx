/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import "../../styles/Auth.css";

type SignUpProps = {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
  variants: Variants;
};

const SignUp: React.FC<SignUpProps> = ({ setIsRegistering, variants }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email: username,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
      setIsRegistering(false);
      alert("A confirmation email has been sent to your email address.");
    }
  };

  const loginGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <motion.div
      variants={variants}
      className="max-w-md w-full space-y-8 bg-[#2e2e52] p-10 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-center font-bold text-[2em]">
        <h1>Inscrivez-vous</h1>
      </div>
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="form__group field">
          <input
            id="email-address-signup"
            name="email"
            type="email"
            required
            className="form__field"
            placeholder=" "
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email-address-signup" className="form__label">
            Adresse e-mail
          </label>
        </div>
        <div className="form__group field">
          <input
            id="password-signup"
            name="password"
            type="password"
            required
            className="form__field"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password-signup" className="form__label">
            Mot de passe
          </label>
        </div>
      </div>
      <div>
        <button
          onClick={handleRegister}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
        >
          S'inscrire
        </button>
        {errorMessage && (
          <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
        )}
      </div>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-[100%] h-px  bg-[#9b9b9b] border-0 "></hr>
        <span className="absolute px-3 font-medium text-[#9b9b9b] -translate-x-1/2 bg-[#2e2e52] left-1/2 ">
          OU
        </span>
      </div>
      <button
        onClick={loginGoogle}
        className="group relative w-full flex justify-center py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
      >
        <Image
          src={"/assets/google.svg"}
          alt={"Google Login"}
          width={30}
          height={30}
        />
      </button>
      <div className="flex row gap-2 items-center">
        <p className="text-sm font-medium">Vous avez déja inscris?</p>
        <button className="signButton" onClick={() => setIsRegistering(false)}>
          Se connecter
          <div className="arrow-wrapper">
            <div className="arrow"></div>
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default SignUp;

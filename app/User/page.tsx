/* eslint-disable react/no-unescaped-entities */
"use client";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

function User() {
  const router = useRouter();
  const user = supabase.auth.getUser();

  if (!user) {
    router.replace("/login");
    return null;
  }

  return (
    <div>
      <h1>Bienvenue sur la page d'accueil</h1>
      {/* Votre contenu ici */}
    </div>
  );
}

export default User;

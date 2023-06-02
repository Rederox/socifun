"use client";
import AuthComp from "@/components/Auth/Auth";
import { User } from "@supabase/supabase-js";
import React from "react";

function LoginPage() {
  const [user, setUser] = React.useState<User | null>(null);

  return <div>hello</div>;
}

export default LoginPage;

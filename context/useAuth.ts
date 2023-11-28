"use client"
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import Authcontext from "./AuthContext";

export const useAuth = () => {
  const authContext = useContext(Authcontext);
  const router = useRouter();

  if (!authContext ) {
    router.replace('/auth/login')
    throw new Error("useAuth must be used within an AuthProvider");
  }

  

  return authContext;
};

"use client"; // Mark this as a Client Component

import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Provider({ children }: Props) {
  return (
    <SessionProvider>
      <AuthListener />
      {children}
    </SessionProvider>
  );
}

function AuthListener() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(session.user));
    } else if (status === "unauthenticated") {
      // Clear localStorage if the user is not authenticated
      localStorage.removeItem("user");
    }
  }, [session, status]);

  return null;
}
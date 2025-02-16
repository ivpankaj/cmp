'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

interface UserProfile {
  email: string;
  bio?: string;
  name?: string;
  balance: number;
  social?: Record<string, string>;
  emailVerified?: Date;
  updatedAt?: Date;
  referralCode?: string;
}

interface UserContextType {
  user: {
    email?: string | null;
    name?: string | null;
    image?: string | null;
  } | null;
  profileData: UserProfile | null;
  loading: boolean;
  refreshProfile: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserContextType['user']>(null);

  const {
    data: profileData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile", session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) {
        throw new Error("User not authenticated");
      }
      const response = await fetch("/api/profile/get");
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      return (await response.json()) as UserProfile;
    },
    enabled: status === "authenticated",
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      });
    } else {
      setUser(null);
    }
  }, [status, session]);

  return (
    <UserContext.Provider
      value={{
        user,
        profileData: profileData || null,
        loading: isLoading,
        refreshProfile: refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
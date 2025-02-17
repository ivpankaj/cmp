
import { signIn, signOut, useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();



  // Custom sign-in function
  const handleSignIn = async () => {
    await signIn("google");
  };

  // Custom sign-out function
  const handleSignOut = async () => {
    await signOut();
  };

  return { session, status, handleSignIn, handleSignOut };
};
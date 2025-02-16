import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  // Store user data in localStorage on sign-in
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        })
      );
    } else if (status === "unauthenticated") {
      // Clear localStorage on sign-out
      localStorage.removeItem("user");
    }
  }, [status, session]);

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
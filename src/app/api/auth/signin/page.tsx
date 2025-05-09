"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import BackgroundEffect from "@/components/Background";
import React, { Suspense, useState } from "react";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundEffect />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div>Loading...</div>}>
          <SignInContent />
        </Suspense>
      </div>
    </div>
  );
}

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");
  const refCode = searchParams.get("ref");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "OAuthAccountNotLinked":
        return "This email is already associated with another account. Please sign in using the original provider.";
      case "OAuthSignin":
        return "Error occurred while trying to sign in. Please try again.";
      case "OAuthCallback":
        return "Error occurred while processing the sign-in request. Please try again.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      // Pass referral code through state parameter
      const stateData = refCode ? { referralCode: refCode } : undefined;
      
      await signIn("google", {
        callbackUrl,
        redirect: true,
        state: stateData ? JSON.stringify(stateData) : undefined
      });
    } catch (err) {
      console.error("Sign-in error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen z-10">
      <div className="max-w-md w-full space-y-8 p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Sign in to cookmypapers</h2>
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">{getErrorMessage(error)}</p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
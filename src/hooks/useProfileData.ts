/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Skill {
  name: string;
  level: number;
}
interface ProfileData {
  name: string;
  bio: string;
  skills: Skill[];
  projects: any[];
  social: { linkedin: string; github: string; twitter: string };
  emailVerified: boolean;
}

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  // Check if the page was refreshed
  const isPageRefreshed = typeof window !== "undefined" && performance.navigation.type === 1;

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);

        // Check if session is still loading
        if (status === "loading") {
          console.log("Session is still loading...");
          return;
        }

        // If user is not logged in, clear profile data
        if (!session?.user?.email) {
          console.error("User not logged in.");
          setProfileData(null);
          setLoading(false);
          return;
        }

        // Try to get profile data from localStorage
        const cachedProfileData = localStorage.getItem("profileData");
        if (cachedProfileData && !isPageRefreshed) {
          console.log("Loading profile data from localStorage...");
          setProfileData(JSON.parse(cachedProfileData));
          setLoading(false);
          return;
        }

        // Fetch profile data from the backend
        console.log("Fetching profile data from the backend...");
        const response = await fetch("/api/profile/get", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);

          // Store the fetched data in localStorage
          localStorage.setItem("profileData", JSON.stringify(data));
        } else {
          console.error("Failed to fetch profile data from the database.");
          setProfileData(null);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [session, status, isPageRefreshed]);

  const saveProfileData = async (data: ProfileData) => {
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setProfileData(data);

        // Update the profile data in localStorage
        localStorage.setItem("profileData", JSON.stringify(data));
      } else {
        throw new Error("Failed to save profile data");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return { profileData, setProfileData, saveProfileData, loading };
};
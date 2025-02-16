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

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);

        // Check if the session is still loading
        if (status === "loading") {
          console.log("Session is still loading...");
          return;
        }

        // Check if the user is logged in
        if (!session?.user?.email) {
          console.error("User not logged in.");
          setProfileData(null);
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

          // Update the profile data in localStorage
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
  }, [session, status]);

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
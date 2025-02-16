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
  const [profileData, setProfileData] = useState<ProfileData | null>(null); // Nullable to handle no session case
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession(); // Use `status` to track session loading

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);

        // Check if the session is loading or the user is not logged in
        if (status === "loading") {
          console.log("Session is still loading...");
          return;
        }

        if (!session?.user?.email) {
          console.error("User not logged in.");
          setProfileData(null); // Clear profile data if user is not logged in
          setLoading(false);
          return;
        }

        // Fetch data from the backend on every page refresh
        const response = await fetch("/api/profile/get", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data); // Update state with fetched data
        } else {
          console.error("Failed to fetch profile data from the database.");
          setProfileData(null); // Clear profile data on fetch failure
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        setProfileData(null); // Clear profile data on error
      } finally {
        setLoading(false);
      }
    };

    // Call the loadProfileData function on component mount
    loadProfileData();
  }, [session, status]); // Add `status` as a dependency to handle session changes

  const saveProfileData = async (data: ProfileData) => {
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setProfileData(data); // Update state with the latest data
      } else {
        throw new Error("Failed to save profile data");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return { profileData, setProfileData, saveProfileData, loading };
};
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

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    bio: "",
    skills: [],
    projects: [],
    social: { linkedin: "", github: "", twitter: "" },
    emailVerified: false,
  });
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        // Check if the app has just been refreshed
        const isPageRefresh = sessionStorage.getItem("isPageRefresh");
        if (!isPageRefresh) {
          // If no flag exists, it's a page refresh
          sessionStorage.setItem("isPageRefresh", "true");

          // Fetch data from the backend on page refresh
          if (session?.user?.email) {
            const response = await fetch("/api/profile/get", {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
              const data = await response.json();

              // Update localStorage with the latest data from the backend
              const cachedData = {
                data,
                timestamp: new Date().getTime(),
              };
              localStorage.setItem("profileData", JSON.stringify(cachedData));

              // Update the state with the latest data
              setProfileData(data);
            } else {
              console.error("Failed to fetch profile data from the database.");
            }
          }
        } else {
          // If the flag exists, it's navigation between pages
          const cachedData = localStorage.getItem("profileData");
          if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const currentTime = new Date().getTime();
            if (currentTime - parsedData.timestamp < CACHE_EXPIRATION_TIME) {
              setProfileData(parsedData.data);
              setLoading(false);
              return;
            }
          }

          // If cache is expired or missing, fetch from the backend
          if (session?.user?.email) {
            const response = await fetch("/api/profile/get", {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
              const data = await response.json();

              // Update localStorage with the latest data from the backend
              const cachedData = {
                data,
                timestamp: new Date().getTime(),
              };
              localStorage.setItem("profileData", JSON.stringify(cachedData));

              // Update the state with the latest data
              setProfileData(data);
            }
          }
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [session]);

  const saveProfileData = async (data: ProfileData) => {
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Update the state with the latest data
        setProfileData(data);

        // Update localStorage with the latest data after saving
        const cachedData = {
          data,
          timestamp: new Date().getTime(),
        };
        localStorage.setItem("profileData", JSON.stringify(cachedData));
      } else {
        throw new Error("Failed to save profile data");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return { profileData, setProfileData, saveProfileData, loading };
};
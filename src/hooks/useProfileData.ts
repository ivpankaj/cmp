/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

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

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // Cache expires after 1 hour

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    bio: '',
    skills: [],
    projects: [],
    social: { linkedin: '', github: '', twitter: '' },
    emailVerified: false,
  });
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        // Check if cached data exists in localStorage
        const cachedData = localStorage.getItem('profileData');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);

          // Check if the cached data is still fresh
          const currentTime = new Date().getTime();
          if (currentTime - parsedData.timestamp < CACHE_EXPIRATION_TIME) {
            // Use cached data if it's fresh
            setProfileData(parsedData.data);
            setLoading(false);
            return;
          }
        }

        // Fetch fresh data from the backend if cache is stale or missing
        if (session?.user?.email) {
          const response = await fetch('/api/profile/get');
          if (response.ok) {
            const data = await response.json();

            // Cache the fetched data with a timestamp
            const cachedData = {
              data,
              timestamp: new Date().getTime(),
            };
            localStorage.setItem('profileData', JSON.stringify(cachedData));

            setProfileData(data);
          }
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [session]);

  const saveProfileData = async (data: ProfileData) => {
    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Update local state
        setProfileData(data);

        // Update cache in localStorage
        const cachedData = {
          data,
          timestamp: new Date().getTime(),
        };
        localStorage.setItem('profileData', JSON.stringify(cachedData));
      } else {
        throw new Error('Failed to save profile data');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return { profileData, setProfileData, saveProfileData, loading };
};
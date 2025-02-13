/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

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
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    bio: '',
    skills: [],
    projects: [],
    emailVerified: false,
    social: { linkedin: '', github: '', twitter: '' },
  });

  useEffect(() => {
    const loadProfileData = () => {
      const savedData = localStorage.getItem('profileData');
      if (savedData) {
        setProfileData(JSON.parse(savedData));
      }
    };
    loadProfileData();
  }, []);

  const saveProfileData = async (data: ProfileData) => {
    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        localStorage.setItem('profileData', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return { profileData, setProfileData, saveProfileData };
};
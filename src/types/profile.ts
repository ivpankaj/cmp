/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Skill {
  name: string;
  level: number;
}

export interface ProfileData {
  name: string;
  bio: string;
  skills: Skill[];
  projects: any[];
  social: { 
    linkedin: string; 
    github: string; 
    twitter: string 
  };
  emailVerified: boolean;
}

export interface ProfileHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileData: any;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  setProfileData: (data: any) => void; // Add this prop
  verificationStatus: string;
  handleVerifyEmail: () => void;
}
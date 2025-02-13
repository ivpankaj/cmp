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
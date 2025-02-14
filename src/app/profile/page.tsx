"use client";
import React, {  useState } from "react";

import BackgroundEffect from "@/components/Background";
import { useProfileData } from "@/hooks/useProfileData";
import ProfileHeader from "@/components/profile comp/ProfileHeader";
import BioSection from "@/components/profile comp/BioSection";
import SocialLinksSection from "@/components/profile comp/SocialLinksSection";
import Button from "@/mini component/Button";

const ProfilePage = () => {


  const { profileData, setProfileData, saveProfileData, loading } =
    useProfileData();
  const [isEditing, setIsEditing] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");



  // Show loader while data is being fetched
  if (loading) {

    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // If session exists but profileData is still null, show an error
  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Failed to load profile data. Please try again later.</p>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      if (profileData) {
        await saveProfileData(profileData);
      } else {
        console.error("Profile data is null");
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      setVerificationStatus("sending");
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
      });
      if (response.ok) {
        setVerificationStatus("sent");
      } else {
        setVerificationStatus("error");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      setVerificationStatus("error");
    }
  };

  return (
    <div className="min-h-screen z-10 bg-black text-white py-8 sm:py-16 md:py-20 relative overflow-hidden">
      <BackgroundEffect />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader
          profileData={profileData}
          isEditing={isEditing}
          setProfileData={setProfileData}
          setIsEditing={setIsEditing}
          verificationStatus={verificationStatus}
          handleVerifyEmail={handleVerifyEmail}
        />
        <div className="space-y-6 sm:space-y-8">
          <BioSection
            profileData={profileData}
            isEditing={isEditing}
            setProfileData={setProfileData}
          />

          <SocialLinksSection
            profileData={profileData}
            isEditing={isEditing}
            setProfileData={setProfileData}
          />
          {isEditing && (
            <div className="flex justify-end mt-4">
              <Button text="Save" onClick={handleSave} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
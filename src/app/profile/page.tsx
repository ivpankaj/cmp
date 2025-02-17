"use client";
import React, { useState } from "react";
import BackgroundEffect from "@/components/Background";
import { useProfileData } from "@/hooks/useProfileData";
import ProfileHeader from "@/components/profile comp/ProfileHeader";
import BioSection from "@/components/profile comp/BioSection";
import SocialLinksSection from "@/components/profile comp/SocialLinksSection";
import Button from "@/mini component/Button";
import CustomPhoneInput from "@/components/CountryCode";

const ProfilePage = () => {
  const { profileData, setProfileData, saveProfileData, loading } =
    useProfileData();
  const [isEditing, setIsEditing] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false); // New state for tracking save operation
  const [showPhoneInput, setShowPhoneInput] = useState(false); // Track whether to show phone input

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      setIsSaving(true); // Start saving process
      if (profileData) {
        await saveProfileData(profileData);
      } else {
        console.error("Profile data is null");
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false); // End saving process regardless of success or failure
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

  const handleAddPhone = () => {
    // Initialize phone data with empty values
    setProfileData({
      ...profileData,
      phone: {
        countryCode: "",
        number: "",
        fullNumber: "",
      },
    });
    setShowPhoneInput(true); // Show the phone input immediately
    setIsEditing(true); // Enable editing mode
  };

  return (
    <div className="min-h-screen z-10 bg-black text-white sm:py-16 md:py-20 relative overflow-hidden">
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

          {/* Phone Section */}
          {isEditing ? (
            // Editing Mode
            showPhoneInput || profileData.phone?.number ? (
              <CustomPhoneInput
                value={{
                  countryCode: profileData.phone?.countryCode || "",
                  number: profileData.phone?.number || "",
                  fullNumber: profileData.phone?.fullNumber || "",
                }}
                isEditing={isEditing}
                onChange={(phoneData: { countryCode: string; number: string; fullNumber: string }) => {
                  setProfileData({
                    ...profileData,
                    phone: {
                      countryCode: phoneData.countryCode,
                      number: phoneData.number,
                      fullNumber: phoneData.fullNumber,
                    },
                  });
                }}
              />
            ) : (
              <div className="flex justify-start">
                <Button
                  text="Add Phone Number"
                  onClick={handleAddPhone}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                />
              </div>
            )
          ) : (
        
            profileData.phone?.number && (
              <div className="text-gray-400">
                Phone: {profileData.phone.fullNumber}
              </div>
            )
          )}

          <SocialLinksSection
            profileData={profileData}
            isEditing={isEditing}
            setProfileData={setProfileData}
          />
          {isEditing && (
            <div className="flex justify-end mt-4">
              <Button
                text={isSaving ? "Saving..." : "Save"} // Change button text based on saving state
                onClick={handleSave}
                disabled={isSaving} // Disable button when saving
                className={isSaving ? "opacity-50 cursor-not-allowed" : ""} // Optional: Add styles for disabled state
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
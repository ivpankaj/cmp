"use client"
import React, { useState } from 'react';
import BackgroundEffect from '@/components/Background';
import { useProfileData } from '@/hooks/useProfileData';
import ProfileHeader from '@/components/profile comp/ProfileHeader';
import BioSection from '@/components/profile comp/BioSection';
import SocialLinksSection from '@/components/profile comp/SocialLinksSection';
import Button from '@/mini component/Button';


const ProfilePage = () => {
  const { profileData, setProfileData,saveProfileData } = useProfileData();
  const [isEditing, setIsEditing] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const handleSave = async () => {
    try {
      // Save the profile data using the custom hook
      if (profileData) {
        await saveProfileData(profileData);
      } else {
        console.error('Profile data is null');
      }

      // Exit editing mode after saving
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };
  const handleVerifyEmail = async () => {
    try {
      setVerificationStatus('sending');
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
      });
      if (response.ok) {
        setVerificationStatus('sent');
      } else {
        setVerificationStatus('error');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      setVerificationStatus('error');
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
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ShieldCheck } from 'lucide-react';
import Button from '@/mini component/Button';
import BackgroundEffect from '@/components/Background';

interface Skill {
  name: string;
  level: number;
}

interface ProfileData {
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

const ProfilePage = () => {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    bio: '',
    skills: [],
    projects: [],
    emailVerified: false,
    social: { linkedin: '', github: '', twitter: '' }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const loadProfileData = () => {
      const savedData = localStorage.getItem('profileData');
      if (savedData) {
        setProfileData(JSON.parse(savedData));
      }
    };
    loadProfileData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        localStorage.setItem('profileData', JSON.stringify(profileData));
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      setVerificationStatus('sending');
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST'
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
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/20">
              <img
                src={session?.user?.image || '/api/placeholder/96/96'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {profileData.emailVerified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-2xl font-bold">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    profileData.name || session?.user?.name
                  )}
                </h1>
              </div>
              <p className="text-gray-400">{session?.user?.email}</p>
              {!profileData.emailVerified && (
                <div className="mt-2">
                  <Button
                    text={
                      verificationStatus === 'sending' ? 'Sending...' :
                      verificationStatus === 'sent' ? 'Check your email' :
                      verificationStatus === 'error' ? 'Try again' :
                      'Verify Email'
                    }
                    onClick={handleVerifyEmail}
                  />
                  {verificationStatus === 'error' && (
                    <p className="text-red-400 text-sm mt-1">Failed to send verification email</p>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Edit/Save Buttons */}
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            {!isEditing ? (
              <Button 
                text="Edit Profile"
                onClick={() => setIsEditing(true)}
              />
            ) : (
              <>
                <Button 
                  text="Save"
                  onClick={handleSave}
                />
                <Button 
                  text="Cancel"
                  onClick={() => setIsEditing(false)}
                />
              </>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-xl sm:text-lg font-semibold mb-2">Bio</h2>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded p-2"
                rows={4}
              />
            ) : (
              <p className="text-gray-300">{profileData.bio || 'No bio yet'}</p>
            )}
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-xl sm:text-lg font-semibold mb-4">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(profileData.skills || []).map((skill, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-lg font-semibold">{skill.name}</div>
                  <div className="text-2xl font-bold text-white/90">{skill.level}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links Section */}
          <div>
            <h2 className="text-xl sm:text-lg font-semibold mb-4">Social Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(profileData.social || {}).map(([platform, url]) => (
                <div 
                  key={platform}
                  className="p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="text-lg capitalize">{platform}</div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        social: { ...profileData.social, [platform]: e.target.value }
                      })}
                      className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 mt-2"
                    />
                  ) : (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                      {url || 'Not set'}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
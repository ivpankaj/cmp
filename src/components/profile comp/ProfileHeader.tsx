/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Button from '@/mini component/Button';
import { useSession } from 'next-auth/react';

interface ProfileHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileData: any;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  setProfileData: (data: any) => void; // Add this prop
  verificationStatus: string;
  handleVerifyEmail: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileData,
  isEditing,
  setIsEditing,
  setProfileData, // Destructure this prop
  verificationStatus,
  handleVerifyEmail,
}) => {
  const { data: session } = useSession();

  return (
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
          onChange={(e) =>
            setProfileData({ ...profileData, name: e.target.value }) // Update only the `name` field
          }
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
                  verificationStatus === 'sending'
                    ? 'Sending...'
                    : verificationStatus === 'sent'
                    ? 'Check your email'
                    : verificationStatus === 'error'
                    ? 'Try again'
                    : 'Verify Email'
                }
                onClick={handleVerifyEmail}
              />
              {verificationStatus === 'error' && (
                <p className="text-red-400 text-sm mt-1">
                  Failed to send verification email
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        {!isEditing ? (
          <Button text="Edit Profile" onClick={() => setIsEditing(true)} />
        ) : (
          <>
           
            <Button text="Cancel" onClick={() => setIsEditing(false)} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
import React from 'react';

interface BioSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileData: any;
  isEditing: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setProfileData: (data: any) => void;
}

const BioSection: React.FC<BioSectionProps> = ({
  profileData,
  isEditing,
  setProfileData,
}) => {
  return (
    <div>
      <h2 className="text-xl sm:text-lg font-semibold mb-2">Bio</h2>
      {isEditing ? (
        <textarea
          value={profileData.bio}
          onChange={(e) =>
            setProfileData({ ...profileData, bio: e.target.value })
          }
          className="w-full bg-white/5 border border-white/10 rounded p-2"
          rows={4}
        />
      ) : (
        <p className="text-gray-300">{profileData.bio || 'No bio yet'}</p>
      )}
    </div>
  );
};

export default BioSection;
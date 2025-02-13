/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Globe2 } from 'lucide-react';
import React from 'react';

interface SocialLinksSectionProps {
  profileData: any;
  isEditing: boolean;
  setProfileData: (data: any) => void;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({
  profileData,
  isEditing,
  setProfileData,
}) => {
  return (
    <div>
      <h2 className="text-xl sm:text-lg font-semibold mb-4">Social Links</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(profileData.social || {}).map(([platform, url]) => (
          <div
            key={platform}
            className="p-4 rounded-lg bg-white/5 border border-white/10"
          >
            <div className="text-lg capitalize"><Globe2/>{platform}</div>
            {isEditing ? (
              <input
                type="text"
                value={url as string}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    social: { ...profileData.social, [platform]: e.target.value },
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 mt-2"
              />
            ) : (
              <a
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                {url as string || 'Not set'}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksSection;
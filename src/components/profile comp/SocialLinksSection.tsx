/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FaInstagram, FaSnapchatGhost } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface SocialLinksSectionProps {
  profileData: any;
  isEditing: boolean;
  setProfileData: (data: any) => void;
}

const socialPlatforms = [
  {
    name: 'instagram',
    icon: FaInstagram,
    color: 'text-pink-500',
    hoverColor: 'hover:text-pink-400'
  },
  {
    name: 'x',
    icon: FaXTwitter,
    color: 'text-white',
    hoverColor: 'hover:text-gray-300'
  },
  {
    name: 'snapchat',
    icon: FaSnapchatGhost,
    color: 'text-yellow-400',
    hoverColor: 'hover:text-yellow-300'
  }
];

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({
  profileData,
  isEditing,
  setProfileData,
}) => {
  const formatSocialLink = (platform: string, link: string) => {
    if (!link) return '';
    
    // Remove any trailing slashes
    link = link.trim().replace(/\/+$/, '');
    
    // Extract username/handle if full URL is provided
    switch (platform) {
      case 'instagram':
        return link.includes('instagram.com') 
          ? link 
          : `https://instagram.com/${link.replace('@', '')}`;
      case 'x':
        return link.includes('x.com') || link.includes('twitter.com')
          ? link
          : `https://x.com/${link.replace('@', '')}`;
      case 'snapchat':
        return link.includes('snapchat.com')
          ? link
          : `https://snapchat.com/add/${link.replace('@', '')}`;
      default:
        return link;
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-lg font-semibold mb-4">Social Links</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {socialPlatforms.map(({ name, icon: Icon, color, hoverColor }) => (
          <div
            key={name}
            className="p-4 rounded-lg bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-2 text-lg capitalize">
              <Icon className={`text-xl ${color}`} />
              {name}
            </div>
            {isEditing ? (
              <input
                type="text"
                placeholder={`Enter ${name} username or URL`}
                value={profileData?.social?.[name] ?? ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    social: {
                      ...profileData.social,
                      [name]: e.target.value,
                    },
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 mt-2"
              />
            ) : (
              <a
                href={formatSocialLink(name, profileData?.social?.[name] || '')}
                target="_blank"
                rel="noopener noreferrer"
                className={`${color} ${hoverColor} transition-colors duration-300`}
              >
                {profileData?.social?.[name] || "Not set"}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksSection;
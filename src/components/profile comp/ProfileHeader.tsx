import React from "react";
import { ShieldCheck, Mail, CheckCircle } from "lucide-react";
import Button from "@/mini component/Button";
import { useSession } from "next-auth/react";
import { ProfileHeaderProps } from "@/types/profile";
import { UserCircle } from "lucide-react";
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileData,
  isEditing,
  setIsEditing,
  setProfileData,
  verificationStatus,
  handleVerifyEmail,
}) => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 z-10">
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/20">


{session?.user?.image ? (
  <img
    src={session.user.image}
    alt="Profile"
    className="w-full h-full object-cover"
  />
) : (
  <UserCircle className="w-full h-full text-gray-500" />
)}

      
        </div>
        <div>
        {profileData.emailVerified && (
            <div className="">
              <div className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 p-2 rounded-3xl shadow-lg transform mb-4 transition-all duration-500 hover:scale-105 animate-shimmer">
                <div className="flex items-center gap-2 p-1">
                  <div className="flex items-center justify-center bg-yellow-100 rounded-full p-1">
                    <ShieldCheck className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-yellow-900">
                      Verified User
                    </span>
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-yellow-700" />
                      <CheckCircle className="w-3 h-3 text-yellow-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-2xl font-bold">
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
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
                  verificationStatus === "sending"
                    ? "Sending..."
                    : verificationStatus === "sent"
                    ? "Check your email"
                    : verificationStatus === "error"
                    ? "Try again"
                    : "Verify Email"
                }
                onClick={handleVerifyEmail}
              />
              {verificationStatus === "error" && (
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

"use client";
import BackgroundEffect from "@/components/Background";
import React, { useState, useCallback } from "react";
import { FaWhatsapp, FaLink, FaCheck } from "react-icons/fa";
import { useUser } from "../context/user-context";
import { Loader2 } from "lucide-react";


const InvitePage = () => {
  const [copied, setCopied] = useState(false);
  const { profileData, loading } = useUser();
  const main = process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : "https://cookmypapers.vercel.app";

  const getInviteLink = useCallback(() => {
    const baseUrl = `${main}/api/auth/signin`;
    return profileData?.referralCode
      ? `${baseUrl}?ref=${encodeURIComponent(profileData.referralCode)}`
      : baseUrl;
  }, [main, profileData?.referralCode]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getInviteLink());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  }, [getInviteLink]);

  const handleWhatsAppInvite = useCallback(() => {
    const inviteLink = encodeURIComponent(getInviteLink());
    const message = encodeURIComponent(
      "Hey! I've integrated this WhatsApp feature. Check it out: "
    );
    window.open(`https://wa.me/?text=${message}${inviteLink}`, "_blank");
  }, [getInviteLink]);

  return (
    <div className="min-h-screen text-white py-20 relative overflow-hidden">
      <BackgroundEffect />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <FaLink className="mr-2 text-blue-400" /> Invite Your Friends
            </h3>
            <p className="text-gray-400 mb-6">
              Share your invite link with friends and grow your network.
            </p>
            <div className="flex flex-col space-y-4">
              {loading ? (
                <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-center">
                    <p className="flex justify-center">
                   <Loader2/>
                  </p>
                </div>
              ) : profileData?.referralCode ? (
                <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-center">
                  <p className="text-lg font-bold">
                    Your Referral Code:{" "}
                    <span className="text-white">{profileData.referralCode}</span>
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-center">
                  <p className="flex justify-center">
                   <Loader2/>
                  </p>
                </div>
              )}
              <button
                onClick={handleWhatsAppInvite}
                className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 hover:shadow-lg"
                disabled={loading || !profileData?.referralCode}
              >
                <FaWhatsapp className="mr-2 text-xl" /> Invite via WhatsApp
              </button>
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 hover:shadow-lg"
                disabled={loading || !profileData?.referralCode}
              >
                {copied ? (
                  <>
                    <FaCheck className="mr-2 text-green-400" /> Link Copied!
                  </>
                ) : (
                  <>
                    <FaLink className="mr-2" /> Copy Invite Link
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <FaCheck className="mr-2 text-green-400" /> How It Works
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center">
                <FaWhatsapp className="mr-2 text-green-400" /> Share directly via WhatsApp
              </li>
              <li className="flex items-center">
                <FaLink className="mr-2 text-blue-400" /> Or copy and share your unique invite link
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-400" /> Friends can join using your referral code
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;
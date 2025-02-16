"use client";
import BackgroundEffect from "@/components/Background";
import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaLink, FaCheck } from "react-icons/fa"; // Importing icons

const main = process.env.NEXT_PUBLIC_URL

const InvitePage = () => {

  console.log(main,"sad")
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile/get");
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setReferralCode(data.referralCode || null);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getInviteLink = () => {
    const baseUrl = `${main}/api/auth/signin`;
   
    return referralCode
      ? `${baseUrl}?&ref=${encodeURIComponent(referralCode)}`
      : `${baseUrl}?`;
  };

  const handleCopyLink = () => {
    const inviteLink = getInviteLink();
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsAppInvite = () => {
    const inviteLink = encodeURIComponent(getInviteLink());
    const message = encodeURIComponent(
      "Hey! I've integrated this WhatsApp feature. Check it out: "
    );
    window.open(`https://wa.me/?text=${message}${inviteLink}`, "_blank");
  };

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
              Share your invite link with friends and grow your network. They
              can join using the link below.
            </p>
            <div className="flex flex-col space-y-4">
              {loading ? (
                <p className="text-center text-gray-400">Loading...</p>
              ) : referralCode ? (
                <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-[1.02] transition-all duration-300 shadow-lg text-center">
                  <p className="text-lg font-bold">
                    Your Referral Code:{" "}
                    <span className="text-white">{referralCode}</span>
                  </p>
                </div>
              ) : (
                <p className="text-center text-red-400">
                  Referral code not available.
                </p>
              )}
              <button
                onClick={handleWhatsAppInvite}
                className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 hover:shadow-lg"
              >
                <FaWhatsapp className="mr-2 text-xl" /> Invite via WhatsApp
              </button>
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-3xl transition-all duration-300 hover:shadow-lg"
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
                <FaWhatsapp className="mr-2 text-green-400" /> Click the Invite
                via WhatsApp button to share directly.
              </li>
              <li className="flex items-center">
                <FaLink className="mr-2 text-blue-400" /> Alternatively, copy
                the invite link and share it anywhere.
              </li>
              <li className="flex items-center">
                <FaCheck className="mr-2 text-green-400" /> Your friends can use
                the link to join the platform.
              </li>
            </ul>
          </div>
        </div>
        <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-center mt-10 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <FaCheck className="mr-2 text-green-400" /> Spread the Word!
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Help us grow by inviting your friends and colleagues. Together, we
            can build a stronger community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;
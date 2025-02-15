"use client";
import BackgroundEffect from "@/components/Background";
import React, { useState } from "react";

const InvitePage = () => {
    const [copied, setCopied] = useState(false); // State to track if the link is copied

    // Function to copy the invite link to clipboard
    const handleCopyLink = () => {
        const inviteLink = "https://cookmypapers.vercel.app"; // Replace with your actual invite link
        navigator.clipboard.writeText(inviteLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        });
    };

    // Function to open WhatsApp with a pre-filled message
    const handleWhatsAppInvite = () => {
        const inviteLink = encodeURIComponent("https://cookmypapers.vercel.app"); // Replace with your actual invite link
        const message = encodeURIComponent(
            "sun be maine ye whatsapp integrate kiya hai  "
        );
        window.open(`https://wa.me/?text=${message}${inviteLink}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
            {/* Background elements */}
            <BackgroundEffect />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Invite Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Invite Details */}
                    <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-6">Invite Your Friends</h3>
                        <p className="text-gray-400 mb-6">
                            Share your invite link with friends and grow your network. They can join using the link below.
                        </p>
                        <div className="flex flex-col space-y-4">
                            {/* WhatsApp Button */}
                            <button
                                onClick={handleWhatsAppInvite}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300"
                            >
                                Invite via WhatsApp
                            </button>

                            {/* Copy Link Button */}
                            <button
                                onClick={handleCopyLink}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300"
                            >
                                {copied ? "Link Copied!" : "Copy Invite Link"}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Illustration or Placeholder */}
                    <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-6">How It Works</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li>1. Click the &quot;Invite via WhatsApp&quot; button to share directly.</li>
                            <li>2. Alternatively, copy the invite link and share it anywhere.</li>
                            <li>3. Your friends can use the link to join the platform.</li>
                        </ul>
                    </div>
                </div>

                {/* Additional Info Box */}
                <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-center mt-10">
                    <h2 className="text-3xl font-bold mb-4">Spread the Word!</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Help us grow by inviting your friends and colleagues. Together, we can build a stronger community.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InvitePage;
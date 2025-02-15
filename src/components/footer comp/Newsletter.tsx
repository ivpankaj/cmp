"use client";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newsletter: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.email.value;
    setLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message, {
          position: "bottom-center", // Center the notification
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            background: "rgba(0, 0, 0, 0.8)", // Dark background for the toast
            backdropFilter: "blur(10px)", // Blur effect for the background
            color: "#fff", // White text color
            border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
            borderRadius: "10px", // Rounded corners
            padding: "1rem", // Padding for better spacing
          },
        });
      } else {
        toast.error(result.error, {
          position: "bottom-center", // Center the notification
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            background: "rgba(0, 0, 0, 0.8)", // Dark background for the toast
            backdropFilter: "blur(10px)", // Blur effect for the background
            color: "#fff", // White text color
            border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
            borderRadius: "10px", // Rounded corners
            padding: "1rem", // Padding for better spacing
          },
        });
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center", // Center the notification
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          background: "rgba(0, 0, 0, 0.8)", // Dark background for the toast
          backdropFilter: "blur(10px)", // Blur effect for the background
          color: "#fff", // White text color
          border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
          borderRadius: "10px", // Rounded corners
          padding: "1rem", // Padding for better spacing
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-xl sm:text-2xl font-bold mt-6 mb-4">Subscribe</h3>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 flex items-center space-x-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <>
              <FaPaperPlane /> <span>Subscribe</span>
            </>
          )}
        </button>
      </form>
      {/* Toast Container */}
      <ToastContainer
        position="top-center" // Center the toast container
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          width: "100%", // Full width for centered positioning
          maxWidth: "400px", // Limit max width for better readability
          margin: "0 auto", // Center horizontally
          zIndex: 9999, // Ensure it appears above other elements
        }}
      />
    </>
  );
};

export default Newsletter;
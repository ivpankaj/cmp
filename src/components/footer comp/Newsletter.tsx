"use client";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Button, TextField } from "@mui/material";

const Newsletter: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
        enqueueSnackbar(result.message, {
          variant: "success",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            padding: "1rem",
            backdropFilter: "blur(10px)",
          },
        });
      } else {
        enqueueSnackbar(result.error, {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            padding: "1rem",
            backdropFilter: "blur(10px)",
          },
        });
      }
    } catch {
      enqueueSnackbar("An unexpected error occurred. Please try again.", {
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "10px",
          padding: "1rem",
          backdropFilter: "blur(10px)",
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
        <TextField
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          InputProps={{
            style: {
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
            },
          }}
          inputProps={{
            style: {
              color: "#fff",
              padding: "0.5rem",
            },
          }}
          sx={{
            flexGrow: 1,
          }}
        />
        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            padding: "0.5rem 1rem",
            borderRadius: "10px",
          }}
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
        </Button>
      </form>
    </>
  );
};

const NewsletterWithSnackbar = () => (
  <SnackbarProvider
    maxSnack={3} // Maximum number of notifications displayed at once
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
  >
    <Newsletter />
  </SnackbarProvider>
);

export default NewsletterWithSnackbar;
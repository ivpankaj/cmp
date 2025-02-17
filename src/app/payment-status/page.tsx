"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner"; // Assuming you're using Sonner for notifications
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Icons
import BackgroundEffect from "@/components/Background";
import { Suspense } from "react"; // Import Suspense

const PaymentStatusPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<"success" | "failure" | null>(null);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams(); // This now works within a Suspense boundary
  const router = useRouter();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        setIsLoading(true);
        const orderId = searchParams.get("order_id");
        if (!orderId) {
          throw new Error("Order ID is missing");
        }

        // Fetch payment status from the backend
        const response = await fetch("/api/payment-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order_id: orderId }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch payment status");
        }
        if (data.success) {
          setPaymentStatus("success");
          setMessage("Payment was successful! Your wallet has been updated.");
        } else {
          setPaymentStatus("failure");
          setMessage("Payment failed. Please try again.");
        }
      } catch (error) {
        toast.error("Failed to check payment status");
        console.error("Error checking payment status:", error);
        setPaymentStatus("failure");
        setMessage("An error occurred while checking payment status.");
      } finally {
        setIsLoading(false);
      }
    };
    checkPaymentStatus();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-2xl text-white">Checking payment status...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <BackgroundEffect />
      <div className="text-center">
        {paymentStatus === "success" ? (
          <>
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Payment Successful!</h1>
            <p className="mt-2">{message}</p>
          </>
        ) : (
          <>
            <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Payment Failed</h1>
            <p className="mt-2">{message}</p>
          </>
        )}
        <button
          onClick={() => router.push("/wallet")}
          className="mt-6 px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Back to Wallet
        </button>
      </div>
    </div>
  );
};

// Wrap the component in a Suspense boundary
const PaymentStatusPageWithSuspense = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <PaymentStatusPage />
    </Suspense>
  );
};

export default PaymentStatusPageWithSuspense;
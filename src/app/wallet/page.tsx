"use client";
import { useEffect, useState } from "react";
import BackgroundEffect from "@/components/Background";
import Button from "@/mini component/Button";
import { toast } from "sonner"; // Assuming you're using Sonner for notifications
import { FaWallet, FaCoins, FaTimesCircle, FaArrowDown, FaArrowUp } from "react-icons/fa"; // Icons
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading spinner icon
import { Transaction, UserProfile } from "@/types/wallet";
import { useUser } from "../context/user-context";
import { load } from "@cashfreepayments/cashfree-js";

const WalletPage = () => {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [referralCode, setReferralCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: "", message: "", bonus: 0 });
  const { profileData } = useUser();
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/profile/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data: UserProfile = await response.json();
      setBalance(data.balance || 0);
    } catch (error) {
      toast.error("Failed to fetch wallet information");
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await fetch("/api/transaction-history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transaction history");
        }

        const data = await response.json();

        // Convert date strings to Date objects
        const formattedTransactions = data.transactions.map((transaction: { date: string | number | Date; }) => ({
          ...transaction,
          date: new Date(transaction.date), // Convert to Date object
        }));

        setTransactions(formattedTransactions);
      } catch (error) {
        toast.error("Failed to fetch transaction history");
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchTransactionHistory();
  }, []);
  const handleAddMoney = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }
    try {
      setIsProcessing(true);
      setErrorMessage(null);
      const response = await fetch("/api/cashfree/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: `order_${Date.now()}`,
          orderAmount: parsedAmount,
          customerId: `user_${profileData?.name}${Date.now()}`,
          customerName: profileData?.name,
          customerEmail: profileData?.email,
          customerPhone: Math.floor(1000000000 + Math.random() * 9000000000).toString(),

        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create Cashfree order");
      }
      const data = await response.json();
      console.log("Cashfree Response:", data);
      if (data && data.payment_session_id) {
        // eslint-disable-next-line prefer-const
        let cashfree = await load({ mode: "production" });
        // eslint-disable-next-line prefer-const
        let checkoutOptions = {
          paymentSessionId: data.payment_session_id, // Use the payment session ID received from your API
          redirectTarget: "_self", // Redirect in the current tab
        };

        cashfree.checkout(checkoutOptions);
      } else {
        throw new Error("Payment session ID missing in response");
      }
    } catch (error) {
      setErrorMessage("Failed to process payment.");
      console.error("Error adding money:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleApplyReferralCode = async () => {
    if (!referralCode.trim()) {
      setErrorMessage("Please enter a valid referral code.");
      return;
    }
    try {
      setIsProcessing(true);
      setErrorMessage(null);
      const response = await fetch("/api/apply-referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ referralCode }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Not a valid code");
      }
      setBalance(data.newBalance);
      setSuccessMessage({
        title: "Referral Applied Successfully!",
        message: "Your referral code has been applied successfully",
        bonus: data.bonus
      });
      setShowSuccessPopup(true);
      setReferralCode("");
      toast.success(`Referral code applied! Bonus: ₹${data.bonus}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to apply referral code"
      );
      toast.error(error instanceof Error ? error.message : "Failed to apply referral code");
    } finally {
      setIsProcessing(false);
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin text-4xl text-blue-500">
          <AiOutlineLoading3Quarters />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden z-10">
      <BackgroundEffect />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-500/20 p-4 rounded-md mb-6 text-red-400 flex items-center gap-2">
            <FaTimesCircle className="text-xl" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Wallet Balance Card */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaWallet className="text-blue-500" /> Your Wallet
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-400">Available Credits</span>
                <span className="text-3xl font-bold flex items-center gap-2">
                  ₹{balance.toFixed(2)} <FaCoins className="text-yellow-500" />
                </span>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter Amount in INR"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-blue-500 transition-colors"
                  disabled={isProcessing}
                />
              </div>
              <Button
                onClick={handleAddMoney}
                text={
                  isProcessing ? (
                    <div className="flex items-center gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                      Processing...
                    </div>
                  ) : (
                    "Add Money"
                  )
                }
                disabled={isProcessing || amount === ""}
              />
            </div>
          </div>

          {/* Referral Code Section */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaCoins className="text-green-500" /> Apply Referral Code
            </h3>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Enter Referral Code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-green-500 transition-colors"
                disabled={isProcessing}
              />
              <Button
                onClick={handleApplyReferralCode}
                text={
                  isProcessing ? (
                    <div className="flex items-center gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                      Applying...
                    </div>
                  ) : (
                    "Apply Referral Code"
                  )
                }
                disabled={isProcessing || !referralCode.trim()}
              />

            </div>
          </div>
        </div>
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
            <div className="bg-black p-6 rounded-lg shadow-lg z-10 text-center relative">
              <button
                className="absolute top-2 right-2 text-white"
                onClick={() => setShowSuccessPopup(false)}
              >
                <FaTimesCircle size={20} />
              </button>
              <FaCoins size={50} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-green-600">{successMessage.title}</h2>
              <p className="text-gray-700">{successMessage.message}</p>
              <p className="text-gray-700">Bonus: ₹{successMessage.bonus.toFixed(2)}</p>
            </div>
          </div>
        )}
        {/* Transaction History */}
        <div className="mt-8 p-6 md:p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg shadow-black/30 transform transition-all duration-300">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
            <FaCoins className="text-purple-500 text-3xl animate-bounce" /> Transaction History
          </h3>

          <div className="space-y-4 max-h-64 md:max-h-96 rounded-3xl overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-5 rounded-xl shadow-md transition-all duration-500 transform  ${transaction.type === "credit"
                    ? "bg-green-400/20 border border-green-300/30"
                    : "bg-red-500/20 border border-red-400/30"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {transaction.type === "credit" ? (
                      <FaArrowDown className="text-green-400 text-2xl animate-pulse" />
                    ) : (
                      <FaArrowUp className="text-red-400 text-2xl animate-pulse" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-white">{transaction.type.toUpperCase()}</span>
                      <span className="text-gray-300">{transaction.source}</span>
                      <span className="text-sm text-gray-400">{transaction.date.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-white">₹{transaction.amount.toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No transactions yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WalletPage;



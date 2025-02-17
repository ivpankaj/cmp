"use client";
import { useEffect, useState } from "react";
import BackgroundEffect from "@/components/Background";
import Button from "@/mini component/Button";
import { toast } from "sonner"; // Assuming you're using Sonner for notifications
import { FaWallet, FaCoins,  FaTimesCircle } from "react-icons/fa"; // Icons
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading spinner icon
import { Transaction, UserProfile } from "@/types/wallet";


const WalletPage = () => {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [referralCode, setReferralCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      const response = await fetch("/api/user/add-money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: parsedAmount }),
      });

      if (!response.ok) {
        throw new Error("Failed to add money");
      }

      const data = await response.json();
      setBalance(data.newBalance);
      setTransactions([
        ...transactions,
        { type: "credit", amount: parsedAmount, date: new Date(), source: "Add Money" },
      ]);
      setAmount("");
      toast.success(`Successfully added ₹${parsedAmount.toFixed(2)}`);
    } catch (error) {
      setErrorMessage("Failed to add money to wallet.");
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to apply referral code");
      }

      const data = await response.json();
      setBalance(data.newBalance);
      toast.success(`Referral code applied! Bonus: ₹${data.bonus}`);
      setReferralCode(""); // Clear the referral code input
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to apply referral code"
      );
      console.error("Error applying referral code:", error);
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
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
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

        {/* Transaction History */}
        <div className="mt-8 p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FaCoins className="text-purple-500" /> Transaction History
          </h3>
          <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-4 rounded-md ${
                    transaction.type === "credit"
                      ? "bg-green-500/20"
                      : "bg-red-500/20"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-lg">
                      {transaction.type}
                    </span>
                    {transaction.source}
                    <span className="text-sm text-gray-400">
                      {transaction.date.toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-lg font-bold">
                    ₹{transaction.amount.toFixed(2)}
                  </span>
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



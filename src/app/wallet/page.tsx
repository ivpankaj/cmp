"use client";
import { useEffect, useState } from "react";
import BackgroundEffect from "@/components/Background";
import Button from "@/mini component/Button";
import { toast } from "sonner"; // Assuming you're using Sonner for notifications

interface Transaction {
  type: string;
  amount: number;
  date: Date;
}

interface UserProfile {
  balance: number;
  email: string;
  name: string;
}

const WalletPage = () => {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/profile/get",{
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

  const handleAddMoney = async () => {
    const parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setIsProcessing(true);
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
        { type: "credit", amount: parsedAmount, date: new Date() },
      ]);
      setAmount("");
      toast.success(`Successfully added ₹${parsedAmount.toFixed(2)}`);
    } catch (error) {
      toast.error("Failed to add money to wallet");
      console.error("Error adding money:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
      <BackgroundEffect />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Wallet Balance Card */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Your Wallet</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-400">Available Credits</span>
                <span className="text-3xl font-bold">₹{balance.toFixed(2)}</span>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter Amount in INR"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white"
                  disabled={isProcessing}
                />
              </div>
              <Button 
                onClick={handleAddMoney} 
                text={isProcessing ? "Processing..." : "Add Money"}
                disabled={isProcessing || amount === ""}
              />
            </div>
          </div>

          {/* Transaction History Card */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Transaction History</h3>
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
                        {transaction.type === "credit" ? "Added" : "Deducted"}
                      </span>
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

        {/* Info Box */}
        <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-center mt-10">
          <h2 className="text-3xl font-bold mb-4">Manage Your Funds Easily!</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Keep track of your wallet balance and transactions seamlessly. Add
            money securely and manage your funds with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
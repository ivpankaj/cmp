"use client";
import BackgroundEffect from "@/components/Background";
import Button from "@/mini component/Button";
import React, { useState } from "react";

const WalletPage = () => {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    interface Transaction {
        type: string;
        amount: number;
        date: Date;
    }

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const handleAddMoney = () => {
        if (parseFloat(amount) > 0) {
            const newBalance = balance + parseFloat(amount);
            setBalance(newBalance);
            setTransactions([
                ...transactions,
                { type: "credit", amount: parseFloat(amount), date: new Date() },
            ]);
            setAmount("");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
            {/* Background elements */}
            <BackgroundEffect />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Wallet Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Wallet Balance */}
                    <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-6">Your Wallet</h3>
                        <div className="flex flex-col space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg text-gray-400">Balance</span>
                                <span className="text-3xl font-bold">₹{balance.toFixed(2)}</span>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Enter Amount in INR"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white"
                                />
                            </div>
                   <Button onClick={handleAddMoney} text="Add Money"/>
                        </div>
                    </div>
                    {/* Right Column: Transaction History */}
                    <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-6">Transaction History</h3>
                        <div className="space-y-4 max-h-64 overflow-y-auto">
                            {transactions.length > 0 ? (
                                transactions.map((transaction, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center p-4 rounded-md ${transaction.type === "credit"
                                            ? "bg-green-500/20"
                                            : "bg-red-500/20"
                                            }`}
                                    >
                                        <span className="text-lg">
                                            {transaction.type === "credit" ? "Added" : "Deducted"}
                                        </span>
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
                {/* Additional Info Box */}
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
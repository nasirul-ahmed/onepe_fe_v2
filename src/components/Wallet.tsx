"use client";

import { Plus, Wallet as WalletIcon, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import config from "@/config/config.json";
import Card from "./Card";
import Typography from "./Typography";
import Button from "./Button";

const Wallet = () => {
  const [balance, setBalance] = useState(12570.5);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const handleAddMoney = (amount: number) => {
    setBalance((prev) => prev + amount);
    // Here you would typically integrate with your payment API
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 text-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <WalletIcon className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold">Wallet</h2>
        </div>
        <button
          onClick={toggleBalanceVisibility}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label={isBalanceVisible ? "Hide balance" : "Show balance"}
        >
          {isBalanceVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Balance Amount */}
      <div className="mb-1">
        <div className="flex items-baseline justify-center">
          <span className="text-xl mr-1">₹</span>
          <span className="text-2xl font-bold">
            {isBalanceVisible ? balance.toLocaleString("en-IN") : "•••••"}
          </span>
        </div>
        <p className="text-blue-100 text-center text-sm mt-1 mb-2">
          Available balance
        </p>
      </div>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {config.quickAddAmounts.map((amount) => (
          <div key={amount}>
            <Card
              hover={true}
              variant="premium"
              className="bg-white/20 hover:bg-white/30 dark:bg-white/70 dark:hover:bg-white/80 border-white shadow-2xl backdrop-blur-sm rounded-xl py-3 px-2 text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {`+ ₹${amount}`}
            </Card>
          </div>
        ))}
      </div>

      {/* Custom Amount Button */}
      {/* <button className="w-full bg-white text-blue-600 hover:bg-blue-50 py-2 px-2 rounded-xl font-semibold flex items-center justify-center transition-colors duration-200">
        <Plus className="w-4 h-4 mr-2" />
        Add Custom Amount
      </button> */}

      {/* <Button className="w-full  hover:bg-blue-50 py-2 px-2 rounded-xl font-semibold flex items-center justify-center transition-colors duration-200">
        <Plus className="w-4 h-4 mr-2" />
        Add Custom Amount
      </Button> */}

      {/* Recent Transactions Link */}
      <div className="text-center mt-2">
        <button className="text-blue-100 hover:text-white text-sm underline transition-colors">
          View transactions history
        </button>
      </div>
    </div>
  );
};

export default Wallet;

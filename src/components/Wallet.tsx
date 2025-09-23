"use client";

import { Wallet as WalletIcon, Eye, EyeOff, Plus, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import config from "@/config/config.json";

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
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gradient-to-br from-slate-800 via-slate-900 to-black dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 rounded-2xl text-white shadow-xl p-4 relative overflow-hidden"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-2xl" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center">
          <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-2">
            <WalletIcon className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold">OnePe Wallet</h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleBalanceVisibility}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label={isBalanceVisible ? "Hide balance" : "Show balance"}
        >
          {isBalanceVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </motion.button>
      </div>

      {/* Balance Section */}
      <div className="text-center mb-4 relative z-10">
        <div className="flex items-center justify-center mb-1">
          <span className="text-lg mr-1 text-gray-300">₹</span>
          <motion.span
            key={balance}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold"
          >
            {isBalanceVisible ? balance.toLocaleString("en-IN") : "•••••"}
          </motion.span>
        </div>
        <p className="text-gray-400 text-sm">Available Balance</p>
      </div>

      {/* Quick Add Section */}
      <div className="mb-3 relative z-10">
        <div className="grid grid-cols-4 gap-2">
          {config.quickAddAmounts.map((amount) => (
            <motion.button
              key={amount}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddMoney(amount)}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200 border border-white/10"
            >
              +₹{amount}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 relative z-10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Money
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 hover:bg-white/20 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 border border-white/10 text-sm"
        >
          <ArrowUpRight className="w-4 h-4" />
          History
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Wallet;

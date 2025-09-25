"use client";

import {
  Wallet as WalletIcon,
  Eye,
  EyeOff,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import config from "@/config/config.json";
import styles from "@/styles/components/wallet.module.css";
import { cn } from "@/lib/utils";

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
      className={styles.walletContainer}
    >
      {/* Subtle pattern overlay */}
      <div className={styles.walletOverlay} />

      {/* Header */}
      <div className={styles.walletHeader}>
        <div className={styles.walletBranding}>
          <div className={styles.walletIconContainer}>
            <WalletIcon className={styles.walletIcon} />
          </div>
          <h2 className={styles.walletTitle}>OnePe Wallet</h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleBalanceVisibility}
          className={styles.visibilityButton}
          aria-label={isBalanceVisible ? "Hide balance" : "Show balance"}
        >
          {isBalanceVisible ? <EyeOff className={styles.visibilityIcon} /> : <Eye className={styles.visibilityIcon} />}
        </motion.button>
      </div>

      {/* Balance Section */}
      <div className={styles.balanceSection}>
        <div className={styles.balanceContainer}>
          <span className={styles.currencySymbol}>₹</span>
          <motion.span
            key={balance}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className={styles.balanceAmount}
          >
            {isBalanceVisible ? balance.toLocaleString("en-IN") : "•••••"}
          </motion.span>
        </div>
        <p className={styles.balanceLabel}>Available Balance</p>
      </div>

      {/* Quick Add Section */}
      <div className={styles.quickAddSection}>
        <div className={styles.quickAddGrid}>
          {config.quickAddAmounts.map((amount) => (
            <motion.button
              key={amount}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddMoney(amount)}
              className={styles.quickAddButton}
            >
              +₹{amount}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionsSection}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className={cn(styles.actionButton, styles.actionButtonPrimary)}
        >
          <Plus className={styles.actionIcon} />
          Add Money
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className={cn(styles.actionButton, styles.actionButtonSecondary)}
        >
          <ArrowUpRight className={styles.actionIcon} />
          History
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Wallet;

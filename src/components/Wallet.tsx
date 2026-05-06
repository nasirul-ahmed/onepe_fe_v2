"use client";

import {
  Wallet as WalletIcon,
  Eye,
  EyeOff,
  Plus,
  ArrowUpRight,
  IndianRupee,
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import config from "@/config/config.json";
import styles from "@/styles/components/wallet.module.css";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useWalletBalance } from "@/hooks/useWallet";
import LoadingDots from "./LoadingDots";
import { useWalletStore } from "@/store/wallet-store";
import Button from "./Button";
import { useNavigation } from "@/hooks/useNavigate";
import ROUTES from "@/config/routes";

const Wallet = () => {
  const { navigate } = useNavigation();

  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const handleAddMoney = (amount: number) => {
    // setBalance((prev) => prev + amount);
    // Here you would typically integrate with your payment API
    navigate(`${ROUTES.WALLET_TOPUP.path}?amount=${amount}`);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const balance = useWalletStore((s) => s.balance);
  const setBalance = useWalletStore((s) => s.setBalance);

  const { data: walletBalance, isLoading: isBalanceLoading } =
    useWalletBalance();

  React.useEffect(() => {
    if (walletBalance?.availableBalance !== undefined) {
      setBalance(walletBalance.availableBalance);
    }
  }, [walletBalance?.availableBalance, setBalance]);

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
          <h2 className={styles.walletTitle}>Balance</h2>
        </div>
        <Button
          onClick={toggleBalanceVisibility}
          className={styles.visibilityButton}
          aria-label={isBalanceVisible ? "Hide balance" : "Show balance"}
        >
          {isBalanceVisible ? (
            <EyeOff className={styles.visibilityIcon} />
          ) : (
            <Eye className={styles.visibilityIcon} />
          )}
        </Button>
      </div>

      {/* Balance Section */}
      <div className={styles.balanceSection}>
        <div className={styles.balanceContainer}>
          {/* <span className={styles.currencySymbol}>₹</span> */}
          <IndianRupee size={24} className={styles.currencySymbol} />
          <motion.span
            key={balance}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className={styles.balanceAmount}
          >
            {isBalanceVisible ? (
              isBalanceLoading ? (
                <LoadingDots />
              ) : (
                balance
              )
            ) : (
              "•••••"
            )}
          </motion.span>
        </div>
        <p className={styles.balanceLabel}>Available Balance</p>
      </div>

      {/* Quick Add Section */}
      <div className={styles.quickAddSection}>
        <div className={styles.quickAddGrid}>
          {config.quickAddAmounts.map((amount) => (
            <Button
              key={amount}
              onClick={() => handleAddMoney(amount)}
              className={styles.quickAddButton}
            >
              <span className="font-semibold text-sm">+₹{amount}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionsSection}>
        <Button
          className={cn(styles.actionButton, styles.actionButtonPrimary)}
          onClick={() => handleAddMoney(0)}
        >
          <Plus className={styles.actionIcon} />
          <span className="font-semibold text-sm">Add Money</span>
        </Button>

        <Button
          // whileTap={{ scale: 0.95 }}
          className={cn(
            styles.actionButton,
            styles.actionButtonSecondary,
            styles.test,
          )}
        >
          <ArrowUpRight className={styles.actionIcon} />
          <span className="font-semibold text-sm">History</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default Wallet;

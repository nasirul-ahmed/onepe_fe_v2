// src/views/WalletTopupView.tsx
"use client";

import React from "react";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { Chip } from "@/components/Chip";
import config from "@/config/config.json";
import { IndianRupee, Zap } from "lucide-react";
import styles from "@/styles/pages/wallet-topup.module.css";
import { useWalletStore } from "@/store/wallet-store";
import { useWalletBalance, useWalletTopup } from "@/hooks/useWallet";
import LoadingDots from "@/components/LoadingDots";
import TransactionHistory from "@/components/TransactionHistory";

type PaymentStatus = "idle" | "success" | "cancelled" | "failed";

const STATUS_MESSAGE: Record<PaymentStatus, string | null> = {
  idle: null,
  success: "✓ Payment successful. Balance will update shortly.",
  cancelled: "Payment was cancelled.",
  failed: "Payment failed. Please try again.",
};

export default function WalletTopupView({ amount }: { amount?: number }) {
  const [amountToAdd, setAmountToAdd] = React.useState(amount ?? 0);
  const [status, setStatus] = React.useState<PaymentStatus>("idle");

  const balance = useWalletStore((s) => s.balance);
  const setBalance = useWalletStore((s) => s.setBalance);

  const { isFetching, data: walletBalance, refetch } = useWalletBalance();
  const { topup, isLoading } = useWalletTopup();

  // Sync React Query result → Zustand store
  React.useEffect(() => {
    if (walletBalance?.availableBalance !== undefined) {
      setBalance(walletBalance.availableBalance);
    }
  }, [walletBalance?.availableBalance, setBalance]);

  const handlePay = async () => {
    const value = Math.abs(amountToAdd);
    if (value <= 0) return;

    setStatus("idle");
    const result = await topup(value);
    setStatus(result);

    if (result === "success") setAmountToAdd(0);
  };

  const quickAmounts = config.quickAddAmounts.map((value: number) => ({
    value,
    badge: value === 1000 ? "Popular" : value === 5000 ? "Maximum" : undefined,
  }));

  return (
    <div className={styles.container}>
      {/* Balance card */}
      <section className={styles.balanceCard}>
        <div className={styles.balanceInfo}>
          <p className={styles.balanceLabel}>Wallet Balance</p>
          <div className={styles.balanceValue}>
            <IndianRupee size={28} />
            <span className={styles.balance}>
              {isFetching ? <LoadingDots /> : balance}
            </span>
          </div>
          <button className={styles.refreshLink} onClick={() => refetch()}>
            Refresh Balance
          </button>
        </div>
        <Zap className={styles.zapIcon} fill="currentColor" />
      </section>

      {/* Add money */}
      <section className={styles.addMoneySection}>
        <h2 className={styles.sectionTitle}>Add Money to your Wallet</h2>

        <TextField
          label="Enter Amount"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(Number(e.target.value))}
          fullWidth
          className={styles.amountInput}
          helperText="UPI Lite can have maximum of ₹5000 balance"
          startAdornment={<IndianRupee />}
        />

        <div className={styles.chipGrid}>
          {quickAmounts.map(({ value, badge }) => (
            <Chip
              key={value}
              label={`+ ₹${value}`}
              badge={badge}
              onClick={() => setAmountToAdd(value)}
              className="rounded-xl"
            />
          ))}
        </div>

        {/* Status message */}
        {STATUS_MESSAGE[status] && (
          <p
            className={
              status === "success"
                ? "text-green-600 text-sm"
                : "text-red-500 text-sm"
            }
          >
            {STATUS_MESSAGE[status]}
          </p>
        )}

        <Button
          fullWidth
          size="xl"
          className={styles.addBtn}
          onClick={handlePay}
          disabled={amountToAdd <= 0 || isLoading}
        >
          {isLoading ? "Processing..." : `Add ₹${amountToAdd}`}
        </Button>
      </section>

      <section className={styles.historySection}>
        <TransactionHistory showFilters={false} showSearchBox={false} />
      </section>
    </div>
  );
}

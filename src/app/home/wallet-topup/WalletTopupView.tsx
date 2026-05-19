"use client";

import React, { useCallback, useRef } from "react";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { Chip } from "@/components/Chip";
import config from "@/config/config.json";
import { IndianRupee, Loader2, Zap } from "lucide-react";
import styles from "@/styles/pages/wallet-topup.module.css";
import { useWalletStore } from "@/store/wallet-store";
import {
  useWalletBalance,
  useWalletTopup,
  useWalletTopupHistory,
} from "@/hooks/useWallet";
import LoadingDots from "@/components/LoadingDots";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";
import { WalletTopup } from "@/lib/interfaces/common.interface";
import HistoryListItem from "@/components/HistoryListItem";

type PaymentStatus = "success" | "cancelled" | "failed" | "refunded" | "idle";

const STATUS_MESSAGE: Record<PaymentStatus, string | null> = {
  idle: null,
  refunded: "Your payment is refunded",
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

  const {
    data: walletHistory,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useWalletTopupHistory(20);

  // Flatten all pages into one list
  const historyItems = walletHistory?.pages.flatMap((p) => p.items) ?? [];

  // const testingItems =
  //   historyItems.length > 0
  //     ? Array.from({ length: 25 }).flatMap((_, index) =>
  //         rawItems.map((item) => ({
  //           ...item,
  //           id: `${item.id}-${index}`, // Appending index guarantees unique React keys
  //           description:
  //             index === 0
  //               ? item.description
  //               : `Mock Transaction Feed #${index + 1}`,
  //           // Rotate statuses to check all visual styles you built
  //           status:
  //             index % 3 === 0
  //               ? "success"
  //               : index % 3 === 1
  //                 ? "failed"
  //                 : "pending",
  //           // Vary the amounts slightly to verify presentation spacing
  //           amount:
  //             index % 2 === 0
  //               ? item.amount + index * 100
  //               : -(item.amount + index * 50),
  //         })),
  //       )
  //     : [];

  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  React.useEffect(() => {
    if (walletBalance?.availableBalance !== undefined) {
      setBalance(walletBalance.availableBalance);
    }
  }, [walletBalance?.availableBalance, setBalance]);

  const handlePay = async () => {
    const value = Math.abs(amountToAdd);
    if (value <= 0) return;

    setStatus("success");
    const result = await topup(value);
    setStatus(result);

    if (result === "success") setAmountToAdd(0);
  };

  const quickAmounts = config.quickAddAmounts.map((value: number) => ({
    value,
    badge: value === 1000 ? "Popular" : value === 5000 ? "Maximum" : undefined,
  }));

  return (
    <div
      className={cn(
        styles.container,
        "flex flex-col overflow-hidden min-h-0 h-full w-full ",
      )}
    >
      {/* Balance card */}
      <div className="flex-none flex flex-col">
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
      </div>

      {/* Add money */}
      <section className={styles.addMoneySection}>
        {/* <h2 className={styles.sectionTitle}>Add Money to your Wallet</h2> */}

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

      {/* Topup history list */}
      <SectionHeader title="Wallet History" classes="ml-4" />
      {/* History Area */}
      <section className="flex-1 min-h-0 overflow-y-auto scrollbar-hide mx-4 pb-24 flex flex-col gap-2">
        {historyItems.map((item, index) => (
          <HistoryListItem
            key={item.id}
            item={item}
            index={index}
            fallbackIcon={<IndianRupee />}
            onClick={(clickedItem) =>
              console.log("Selected transaction:", clickedItem.id)
            }
          />
        ))}

        <div ref={sentinelRef} className="h-4 w-full" />

        {isFetchingNextPage && (
          <div className="flex justify-center py-4 pb-10">
            <Loader2 className="animate-spin text-gray-400" size={20} />
          </div>
        )}

        {!hasNextPage && historyItems.length > 0 && (
          <p className="text-center text-xs text-gray-400 py-4">
            {`You've reached the end`}
          </p>
        )}
      </section>
    </div>
  );
}

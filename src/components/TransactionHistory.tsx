"use client";

import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import styles from "@/styles/components/transactionHistory.module.css";
import { cn } from "@/lib/utils";
import { useWalletHistory } from "@/hooks/useWallet";
import { TransactionItem } from "@/types/transaction";
import { usePathname } from "next/navigation";
import SkeletonList from "./SkeletonList";

interface TransactionHistoryProps {
  pageTitle?: string;
  showSearchBox?: boolean;
  showFilters?: boolean;
}

// Map ledger data → display shape
function formatItem(item: TransactionItem) {
  const isCredit = item.type === "credit";

  return {
    id: item.id,
    title: isCredit ? "Money Added to wallet" : "Payment",
    subtitle: item.providerReferenceId ?? item.reference ?? "",
    amount: isCredit ? item.amount : -item.amount,
    status: item.status,
    date: item.createdAt,
    icon: isCredit ? "💰" : item.category === "telecom" ? "📱" : "💡",
  };
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "completed", label: "Success" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
] as const;

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  showSearchBox = false,
  showFilters = false,
  pageTitle = "Transaction History",
}) => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState("all");

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useWalletHistory(20);

  // Flatten all pages into one list
  const allItems = data?.pages.flatMap((p) => p.items) ?? [];

  const filtered = allItems
    .filter(
      (item) => selectedFilter === "all" || item.status === selectedFilter,
    )
    .filter((item) =>
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  // Intersection Observer — fires when sentinel div enters viewport
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

  const getStatusClass = (s: string) => styles[`status${capitalize(s)}`] ?? "";
  const getStatusBgClass = (s: string) =>
    styles[`statusBg${capitalize(s)}`] ?? "";
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <SkeletonList count={8} />
      </div>
    );
  }

  const isNotTransactionPage = pathname !== "/transactions";

  return (
    <div className={styles.container}>
      {/* Search + Filter — full view only */}
      {(showFilters && showSearchBox) ||
        (!isNotTransactionPage && (
          <div className={cn(styles.header, "flex flex-col gap-4")}>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterContainer}>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setSelectedFilter(f.key)}
                  className={cn(
                    styles.filterButton,
                    selectedFilter === f.key
                      ? styles.filterButtonActive
                      : styles.filterButtonInactive,
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        ))}

      {/* List */}
      <div className={styles.transactionsList}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📊</div>
            <p className={styles.emptyStateText}>No transactions found</p>
          </div>
        ) : (
          <>
            {filtered.map((item, index) => {
              const tx = formatItem(item);
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.3) }} // cap delay
                  className={styles.transactionItem}
                >
                  <div className={styles.transactionContent}>
                    <div className={styles.transactionIcon}>{tx.icon}</div>
                    <div className={styles.transactionDetails}>
                      <h3 className={styles.transactionTitle}>{tx.title}</h3>
                      <p className={styles.transactionSubtitle}>
                        {tx.subtitle}
                      </p>
                      <div className={styles.transactionMeta}>
                        <span
                          className={cn(
                            styles.statusBadge,
                            getStatusBgClass(tx.status),
                            getStatusClass(tx.status),
                          )}
                        >
                          {capitalize(tx.status)}
                        </span>
                        <span className={styles.transactionDate}>
                          {new Date(tx.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.transactionAmount}>
                    <div
                      className={cn(
                        styles.amountValue,
                        tx.amount > 0
                          ? styles.amountPositive
                          : styles.amountNegative,
                      )}
                    >
                      <p>{}</p>
                      {tx.amount > 0 ? (
                        <ArrowDownRight className={styles.amountIcon} />
                      ) : (
                        <ArrowUpRight className={styles.amountIcon} />
                      )}
                      ₹{Math.abs(tx.amount).toLocaleString("en-IN")}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Sentinel — observed to trigger next page fetch */}
            {<div ref={sentinelRef} className="h-4 w-full" />}

            {/* Spinner while loading next page */}
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin text-gray-400" size={20} />
              </div>
            )}

            {/* End of list */}
            {!hasNextPage && filtered.length > 0 && (
              <p className="text-center text-xs text-gray-400 py-4">
                {`You've reached the end`}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;

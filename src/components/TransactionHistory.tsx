"use client";

import React, { useRef, useCallback } from "react";
import { Search, Loader2, IndianRupee } from "lucide-react";
import styles from "@/styles/components/transactionHistory.module.css";
import { capitalize, cn } from "@/lib/utils";
import { useTransactionHistory } from "@/hooks/useWallet";
import { TransactionItem } from "@/types/transaction";
import { usePathname } from "next/navigation";
import SkeletonList from "./SkeletonList";
import { useNavigation } from "@/hooks/useNavigate";
import HistoryListItem from "./HistoryListItem";

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
    title: isCredit ? "Money Added to wallet" : item.description,
    subtitle: item.reference || item.idempotencyKey || item.providerReferenceId,
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
  const { navigate } = useNavigation();
  const {
    data: transactions,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useTransactionHistory(20);

  // Flatten all pages into one list
  const allItems = transactions?.pages.flatMap((p) => p.items) ?? [];

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

  const handleTxnItemClick = (txn: TransactionItem) => {
    // const txn = allItems.find((item) => item.id === id);

    if (txn.metadata?.serviceType === "MOBILE_RECHARGE") {
      navigate(
        `/services/recharge?step=recharge-status&orderId=${txn.reference}`,
      );
    }
  };

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
      <div
        className={cn(
          styles.transactionsList,
          "flex-1 overflow-y-auto scrollbar-hide mt-1 px-2 bg-surface pb-44",
        )}
      >
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📊</div>
            <p className={styles.emptyStateText}>No transactions found</p>
          </div>
        ) : (
          <>
            {filtered.map((item, index) => {
              return (
                <HistoryListItem
                  key={item.id}
                  index={index}
                  item={item}
                  fallbackIcon={<IndianRupee />}
                  onClick={() => handleTxnItemClick(item)}
                />
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

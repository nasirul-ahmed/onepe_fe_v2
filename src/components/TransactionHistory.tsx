"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from '@/styles/components/transactionHistory.module.css';
import { cn } from '@/lib/utils';

export interface Transaction {
  id: string;
  type: 'bill_payment' | 'recharge' | 'add_money';
  title: string;
  subtitle: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  date: string;
  category: string;
  icon: string;
}

interface TransactionHistoryProps {
  isPreview?: boolean;
  limit?: number;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ 
  isPreview = false, 
  limit = isPreview ? 3 : undefined 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - replace with actual API call
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'bill_payment',
      title: 'Electricity Bill',
      subtitle: 'BESCOM - 123456789',
      amount: -850,
      status: 'success',
      date: '2025-09-22',
      category: 'utilities',
      icon: '💡'
    },
    {
      id: '2',
      type: 'recharge',
      title: 'Mobile Recharge',
      subtitle: 'Airtel - 9876543210',
      amount: -299,
      status: 'success',
      date: '2025-09-21',
      category: 'telecom',
      icon: '📱'
    },
    {
      id: '3',
      type: 'add_money',
      title: 'Added to Wallet',
      subtitle: 'From Bank Account',
      amount: 2000,
      status: 'success',
      date: '2025-09-20',
      category: 'wallet',
      icon: '💰'
    },
    {
      id: '4',
      type: 'bill_payment',
      title: 'DTH Recharge',
      subtitle: 'Tata Play - 987654321',
      amount: -399,
      status: 'success',
      date: '2025-09-19',
      category: 'entertainment',
      icon: '📺'
    },
    {
      id: '5',
      type: 'bill_payment',
      title: 'Water Bill',
      subtitle: 'BWSSB - 456789123',
      amount: -320,
      status: 'pending',
      date: '2025-09-18',
      category: 'utilities',
      icon: '💧'
    }
  ]);

  const filteredTransactions = transactions
    .filter(transaction => 
      transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(transaction => 
      selectedFilter === 'all' || transaction.status === selectedFilter
    )
    .slice(0, limit);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'success': return styles.statusSuccess;
      case 'pending': return styles.statusPending;
      case 'failed': return styles.statusFailed;
      default: return styles.statusDefault;
    }
  };

  const getStatusBgClass = (status: string) => {
    switch (status) {
      case 'success': return styles.statusBgSuccess;
      case 'pending': return styles.statusBgPending;
      case 'failed': return styles.statusBgFailed;
      default: return styles.statusBgDefault;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {isPreview ? 'Recent Transactions' : 'Transaction History'}
        </h2>
        {isPreview && (
          <button className={styles.viewAllButton}>
            View All
          </button>
        )}
      </div>

      {!isPreview && (
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
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

          {/* Filter Buttons */}
          <div className={styles.filterContainer}>
            {[
              { key: 'all', label: 'All' },
              { key: 'success', label: 'Success' },
              { key: 'pending', label: 'Pending' },
              { key: 'failed', label: 'Failed' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={cn(
                  styles.filterButton,
                  selectedFilter === filter.key 
                    ? styles.filterButtonActive 
                    : styles.filterButtonInactive
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className={styles.transactionsList}>
        {filteredTransactions.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📊</div>
            <p className={styles.emptyStateText}>No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={styles.transactionItem}
            >
              <div className={styles.transactionContent}>
                <div className={styles.transactionIcon}>
                  {transaction.icon}
                </div>
                <div className={styles.transactionDetails}>
                  <h3 className={styles.transactionTitle}>
                    {transaction.title}
                  </h3>
                  <p className={styles.transactionSubtitle}>
                    {transaction.subtitle}
                  </p>
                  <div className={styles.transactionMeta}>
                    <span className={cn(
                      styles.statusBadge,
                      getStatusBgClass(transaction.status),
                      getStatusClass(transaction.status)
                    )}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                    <span className={styles.transactionDate}>
                      {new Date(transaction.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.transactionAmount}>
                <div className={cn(
                  styles.amountValue,
                  transaction.amount > 0 ? styles.amountPositive : styles.amountNegative
                )}>
                  {transaction.amount > 0 ? (
                    <ArrowDownRight className={styles.amountIcon} />
                  ) : (
                    <ArrowUpRight className={styles.amountIcon} />
                  )}
                  ₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
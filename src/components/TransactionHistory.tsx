"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-secondary';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'success': return 'bg-success/10';
      case 'pending': return 'bg-warning/10';
      case 'failed': return 'bg-error/10';
      default: return 'bg-secondary/10';
    }
  };

  return (
    <div className="bg-surface rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-on-surface">
          {isPreview ? 'Recent Transactions' : 'Transaction History'}
        </h2>
        {isPreview && (
          <button className="text-primary text-sm font-medium">
            View All
          </button>
        )}
      </div>

      {!isPreview && (
        <div className="space-y-4 mb-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary h-4 w-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'success', label: 'Success' },
              { key: 'pending', label: 'Pending' },
              { key: 'failed', label: 'Failed' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-primary text-on-primary'
                    : 'bg-muted text-secondary hover:bg-primary/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-secondary">No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background rounded-xl border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xl">
                  {transaction.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-on-surface">
                    {transaction.title}
                  </h3>
                  <p className="text-sm text-secondary">
                    {transaction.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBg(transaction.status)} ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                    <span className="text-xs text-secondary">
                      {new Date(transaction.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-semibold flex items-center gap-1 ${
                  transaction.amount > 0 ? 'text-success' : 'text-on-surface'
                }`}>
                  {transaction.amount > 0 ? (
                    <ArrowDownRight className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
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
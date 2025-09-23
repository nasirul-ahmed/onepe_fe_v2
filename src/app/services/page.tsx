"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ContentLayout from '@/components/ContentLayout';
import AvailableServices from '@/components/AvailableServices';

export default function ServicesPage() {
  const allServices = [
    { icon: "📱", name: "Mobile Recharge", isPopular: true, discount: "5%" },
    { icon: "📺", name: "DTH Recharge", discount: "3%" },
    { icon: "💡", name: "Electricity Bill" },
    { icon: "💧", name: "Water Bill" },
    { icon: "🛢️", name: "Gas Bill", isPopular: true },
    { icon: "🏠", name: "Rent Payment" },
    { icon: "🚗", name: "FasTag Recharge", discount: "Free" },
    { icon: "🛡️", name: "Insurance Premium" },
    { icon: "💳", name: "Credit Card Bill", isPopular: true },
    { icon: "💸", name: "Loan EMI" },
    { icon: "🎓", name: "Education Fee" },
    { icon: "🏥", name: "Hospital Bills" },
    { icon: "📡", name: "Broadband" },
    { icon: "📞", name: "Landline" },
    { icon: "🚇", name: "Metro Card" },
    { icon: "🎬", name: "Entertainment" },
  ];

  return (
    <ContentLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-on-surface mb-2">All Services</h1>
          <p className="text-secondary">Pay all your bills in one place</p>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 p-4 rounded-xl border border-green-200 dark:border-green-800/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-300">🎉 Special Offers</h3>
              <p className="text-sm text-green-600 dark:text-green-400">Up to 5% cashback on all bill payments</p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>

        <AvailableServices services={allServices} />
      </motion.div>
    </ContentLayout>
  );
}
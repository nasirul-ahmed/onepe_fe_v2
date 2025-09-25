"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ContentLayout from '@/components/ContentLayout';
import AvailableServices from '@/components/AvailableServices';
import styles from '@/styles/pages/services.module.css';

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
        className={styles.container}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>All Services</h1>
          <p className={styles.subtitle}>Pay all your bills in one place</p>
        </div>

        <div className={styles.specialOffer}>
          <div className={styles.specialOfferContent}>
            <div>
              <h3 className={styles.specialOfferTitle}>🎉 Special Offers</h3>
              <p className={styles.specialOfferDescription}>Up to 5% cashback on all bill payments</p>
            </div>
            <div className={styles.specialOfferIcon}>💰</div>
          </div>
        </div>

        <AvailableServices services={allServices} />
      </motion.div>
    </ContentLayout>
  );
}
"use client";
import ContentLayout from "@/components/ContentLayout";
import AvailableServices, { Service } from "@/components/AvailableServices";
import React, { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import Wallet from "@/components/Wallet";
import CarouselItem from "@/components/CarouselItem";
import Carousel from "@/components/Carousel";
import { motion } from "framer-motion";
import TransactionHistory from "@/components/TransactionHistory";
import config  from "@/config/config.json";

export default function HomePage() {
  const { setLoading } = useAppStore();
  const [services, setServices] = React.useState<Service[]>([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setServices(config.availableServices);

      setLoading(false);
    }, 1000);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [setLoading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <ContentLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Promotional Banners */}
        <motion.div variants={itemVariants}>
          <Carousel
            autoPlay
            loop={true}
            interval={5000}
            showControls={false}
            showArrows={false}
            className="rounded-2xl shadow-xl overflow-hidden"
            itemClassName="h-full"
          >
            <CarouselItem>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-36 flex flex-col items-center justify-center text-white p-4 text-center">
                <h3 className="text-xl font-bold mb-2">Special Offer! 🎉</h3>
                <p className="text-sm mb-3">
                  Get 5% cashback on mobile recharge
                </p>
                <div className="bg-white/20 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold">
                    Use code: MOBILE5
                  </span>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="bg-gradient-to-r from-green-500 to-teal-600 h-36 flex flex-col items-center justify-center text-white p-4 text-center">
                <h3 className="text-xl font-bold mb-2">
                  Bill Payment Bonus! 💰
                </h3>
                <p className="text-sm mb-3">Pay 3 bills and get ₹50 cashback</p>
                <div className="bg-white/20 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold">
                    Limited time offer
                  </span>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="bg-gradient-to-r from-orange-500 to-red-600 h-36 flex flex-col items-center justify-center text-white p-4 text-center">
                <h3 className="text-xl font-bold mb-2">FasTag Recharge! 🚗</h3>
                <p className="text-sm mb-3">Zero convenience fee on FasTag</p>
                <div className="bg-white/20 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold">
                    Save more, travel more
                  </span>
                </div>
              </div>
            </CarouselItem>
          </Carousel>
        </motion.div>

        {/* Wallet Section */}
        <motion.div variants={itemVariants}>
          <Wallet />
        </motion.div>

        {/* Quick Actions - Commented out for better space utilization
        <motion.div
          variants={itemVariants}
          className="bg-surface rounded-2xl p-4 shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4 text-on-surface">
            Quick Actions
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-3 bg-primary/10 rounded-xl"
            >
              <span className="text-2xl mb-1">⚡</span>
              <span className="text-xs font-medium text-primary">
                Pay Bills
              </span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-3 bg-success/10 rounded-xl"
            >
              <span className="text-2xl mb-1">📱</span>
              <span className="text-xs font-medium text-success">Recharge</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-3 bg-warning/10 rounded-xl"
            >
              <span className="text-2xl mb-1">💳</span>
              <span className="text-xs font-medium text-warning">
                Add Money
              </span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-3 bg-tertiary/10 rounded-xl"
            >
              <span className="text-2xl mb-1">📊</span>
              <span className="text-xs font-medium text-tertiary">History</span>
            </motion.button>
          </div>
        </motion.div>
        */}

        {/* Available Services */}
        <motion.div variants={itemVariants}>
          <AvailableServices services={services} />
        </motion.div>

        {/* Recent Transactions */}
        <motion.div variants={itemVariants}>
          <TransactionHistory isPreview={true} />
        </motion.div>
      </motion.div>
    </ContentLayout>
  );
}

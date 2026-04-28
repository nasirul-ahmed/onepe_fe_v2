"use client";
import ContentLayout from "@/components/ContentLayout";
import React, { useState } from "react";
import Wallet from "@/components/Wallet";
import CarouselItem from "@/components/CarouselItem";
import Carousel from "@/components/Carousel";
import { motion } from "framer-motion";
import TransactionHistory from "@/components/TransactionHistory";
import styles from "@/styles/pages/home.module.css";
import { cn } from "@/lib/utils";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Service } from "@/lib/interfaces/services";

interface HomeViewProps {
  initialServices: Service[];
}

export default function HomeView({ initialServices }: HomeViewProps) {
  const [isServicesModalOpen, setServicesModalOpen] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <ContentLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={styles.container}
      >
        {/* Promotional Banners */}
        <motion.div variants={itemVariants} className="w-full">
          <Carousel
            autoPlay
            loop={true}
            interval={5000}
            showControls={false}
            showArrows={false}
            showDots={false}
            className={cn(styles.carouselWrapper, "rounded-2xl")}
            itemClassName="h-full"
          >
            <CarouselItem>
              <div
                className={cn(
                  styles.promoCard,
                  styles.promoCardBlue,
                  "rounded-2xl ml-1 mr-1",
                )}
              >
                <h3 className={styles.promoTitle}>Special Offer! 🎉</h3>
                <p className={styles.promoDescription}>
                  Get 5% cashback on mobile recharge
                </p>
                <div className={styles.promoBadge}>
                  <span className={styles.promoBadgeText}>
                    Use code: MOBILE5
                  </span>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div
                className={cn(
                  styles.promoCard,
                  styles.promoCardGreen,
                  "rounded-2xl ml-1 mr-1",
                )}
              >
                <h3 className={styles.promoTitle}>Bill Payment Bonus! 💰</h3>
                <p className={styles.promoDescription}>
                  Pay 3 bills and get ₹50 cashback
                </p>
                <div className={styles.promoBadge}>
                  <span className={styles.promoBadgeText}>
                    Limited time offer
                  </span>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div
                className={cn(
                  styles.promoCard,
                  styles.promoCardOrange,
                  "rounded-2xl ml-1",
                )}
              >
                <h3 className={styles.promoTitle}>FasTag Recharge! 🚗</h3>
                <p className={styles.promoDescription}>
                  Zero convenience fee on FasTag
                </p>
                <div className={styles.promoBadge}>
                  <span className={styles.promoBadgeText}>
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

        {/* Available Services - Now received as props */}
        <motion.div variants={itemVariants}>
          {/* <AvailableServices services={initialServices} /> */}
          <ServicesGrid
            services={initialServices}
            isModalOpen={isServicesModalOpen}
            onOpenModal={() => setServicesModalOpen(true)}
            onCloseModal={() => setServicesModalOpen(false)}
          />
        </motion.div>

        {/* Recent Transactions */}
        <motion.div variants={itemVariants}>
          <TransactionHistory />
        </motion.div>
      </motion.div>
    </ContentLayout>
  );
}

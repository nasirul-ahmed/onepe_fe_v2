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
import ServicesGrid from "@/components/ServicesGrid";
import { useBanners } from "@/hooks/useBanners";
import DynamicBanner from "@/components/banners/DynamicBanner";
import { BaseBanner } from "@/types/banner";
import SectionHeader from "@/components/SectionHeader";
import { ROUTE_PATHS } from "@/config/routes";
import { useNavigation } from "@/hooks/useNavigate";
import { useAppServices } from "@/hooks/useAppServices";

export default function HomeView() {
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
  const { navigate } = useNavigation();
  const { data: banners } = useBanners();
  const [isServicesModalOpen, setServicesModalOpen] = useState(false);

  const { data: initialServices } = useAppServices();

  return (
    <ContentLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={styles.container}
      >
        {/* Promotional Banners */}
        {banners?.items && banners.items.length > 0 && (
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
              {banners?.items?.map(
                (banner: BaseBanner, index: number) => {
                  return (
                    <CarouselItem key={index}>
                      <DynamicBanner banner={banner} />
                    </CarouselItem>
                  );
                },
              )}
            </Carousel>
          </motion.div>
        )}

        {/* Wallet Section */}
        <motion.div variants={itemVariants}>
          <Wallet />
        </motion.div>

        {/* Available Services - Now received as props */}
        <motion.div variants={itemVariants}>
          <SectionHeader
            title="Recharge & Services"
            trailing={
              <button
                onClick={() => setServicesModalOpen(true)}
                className="text-sm text-sky-600 font-medium hover:underline"
              >
                See All
              </button>
            }
          />
          <ServicesGrid
            services={initialServices?.services || []}
            modalEnabled={true}
            isModalOpen={isServicesModalOpen}
            onOpenModal={() => setServicesModalOpen(true)}
            onCloseModal={() => setServicesModalOpen(false)}
          />
        </motion.div>

        {/* Recent Transactions */}
        <motion.div variants={itemVariants}>
          <SectionHeader
            title="Transaction History"
            trailing={
              <button
                onClick={() => navigate(ROUTE_PATHS.TRANSACTIONS)}
                className="text-sm text-sky-600 font-medium hover:underline"
              >
                See All
              </button>
            }
          />
          <TransactionHistory />
        </motion.div>
      </motion.div>
    </ContentLayout>
  );
}

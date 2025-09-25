"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { RouteUtils } from "@/config/routes";
import Card from "./Card";
import styles from "@/styles/components/serviceAvailable.module.css";
import { cn } from "@/lib/utils";

export interface Service {
  icon: string;
  name: string;
  isPopular?: boolean;
  discount?: string;
}

interface AvailableServicesProps {
  services: Service[];
}

const AvailableServices = (props: AvailableServicesProps) => {
  const { services } = props;
  const router = useRouter();

  const getServiceRoute = (serviceName: string) => {
    return RouteUtils.getServiceRoute(serviceName);
  };

  const handleServiceClick = (serviceName: string) => {
    router.push(getServiceRoute(serviceName));
  };

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
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className={styles.servicesSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Bill Payments & Services</h2>

        <button
          onClick={() => router.push("/services")}
          className={styles.viewAllButton}
        >
          View All
        </button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={styles.servicesGrid}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleServiceClick(service.name)}
          >
            <Card variant="default" padding="sm" className={styles.serviceCard}>
              {service.isPopular && (
                <div className={styles.popularBadge}>HOT</div>
              )}

              {service.discount && (
                <div className={styles.discountBadge}>{service.discount}</div>
              )}

              <span className={styles.serviceIcon}>{service.icon}</span>
              <span className={styles.serviceName}>{service.name}</span>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Service Categories */}
      <div className={styles.categoriesSection}>
        <h3 className={styles.categoriesTitle}>Categories</h3>
        <div className={styles.categoriesContainer}>
          <motion.div
            whileTap={{ scale: 0.98 }}
            className={cn(styles.categoryCard, styles.categoryCardUtilities)}
          >
            <div className={styles.categoryContent}>
              <div className={styles.categoryIconWrapper}>
                <span className={styles.categoryIconEmoji}>⚡</span>
              </div>
              <div className={styles.categoryInfo}>
                <h4 className={styles.categoryName}>Utilities</h4>
                <p className={styles.categoryDescription}>
                  Electricity, Water, Gas
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            className={cn(styles.categoryCard, styles.categoryCardFinancial)}
          >
            <div className={styles.categoryContent}>
              <div className={cn(styles.categoryIconWrapper, styles.iconBlue)}>
                <span className={styles.categoryIconEmoji}>📱</span>
              </div>
              <div className={styles.categoryInfo}>
                <h4 className={cn(styles.categoryName, styles.textBlue)}>
                  Telecom
                </h4>
                <p
                  className={cn(
                    styles.categoryDescription,
                    styles.textBlueLight
                  )}
                >
                  Mobile, DTH, Broadband
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            className={cn(
              styles.categoryCard,
              styles.categoryCardEntertainment
            )}
          >
            <div className={styles.categoryContent}>
              <div
                className={cn(styles.categoryIconWrapper, styles.iconPurple)}
              >
                <span className={styles.categoryIconEmoji}>🏦</span>
              </div>
              <div className={styles.categoryInfo}>
                <h4 className={cn(styles.categoryName, styles.textPurple)}>
                  Banking
                </h4>
                <p
                  className={cn(
                    styles.categoryDescription,
                    styles.textPurpleLight
                  )}
                >
                  Credit Card, Loan EMI
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            className={cn(styles.categoryCard, styles.categoryCardTravel)}
          >
            <div className={styles.categoryContent}>
              <div
                className={cn(styles.categoryIconWrapper, styles.iconOrange)}
              >
                <span className={styles.categoryIconEmoji}>🎯</span>
              </div>
              <div className={styles.categoryInfo}>
                <h4 className={cn(styles.categoryName, styles.textOrange)}>
                  Entertainment
                </h4>
                <p
                  className={cn(
                    styles.categoryDescription,
                    styles.textOrangeLight
                  )}
                >
                  OTT, Gaming, Music
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AvailableServices;

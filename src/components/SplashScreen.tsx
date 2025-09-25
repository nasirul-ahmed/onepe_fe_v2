"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/config/routes";
import styles from '@/styles/components/splashScreen.module.css';
import { cn } from '@/lib/utils';

const SplashScreen = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 500);
    const timer2 = setTimeout(() => setShowTagline(true), 1500);
    const timer3 = setTimeout(() => setShowLoader(true), 2500);

    const timer4 = setTimeout(() => {
      router.push(ROUTE_PATHS.HOME);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [router]);

  return (
    <div className={styles.splashContainer}>
      {/* Animated Background Elements */}
      <div className={styles.backgroundElements}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.backgroundDot}
            animate={{
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 800 - 400],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Logo Animation */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 1,
              }}
              className={styles.logoContainer}
            >
              <div className={styles.logoWrapper}>
                {/* Outer Ring */}
                <motion.div
                  className={styles.logoOuterRing}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Inner Circle with Logo */}
                <div className={styles.logoInnerCircle}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className={styles.logoText}
                  >
                    1Pe
                  </motion.div>
                </div>

                {/* Pulse Effect */}
                <motion.div
                  className={styles.logoPulse}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* App Name */}
        <AnimatePresence>
          {showLogo && (
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className={styles.appName}
            >
              <span className={styles.appNameOne}>One</span>
              <span className={styles.appNamePe}>Pe</span>
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Tagline */}
        <AnimatePresence>
          {showTagline && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={styles.tagline}
            >
              Once & for all Payment
            </motion.p>
          )}
        </AnimatePresence>

        {/* Loading Animation */}
        <AnimatePresence>
          {showLoader && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.loadingContainer}
            >
              <div className={styles.loadingDots}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={styles.loadingDot}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={styles.loadingText}
              >
                Loading...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Decoration */}
      <div className={styles.bottomDecoration}>
        <motion.div
          className={styles.progressBar}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;

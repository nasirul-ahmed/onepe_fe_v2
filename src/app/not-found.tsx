"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, Search, Home } from "lucide-react";
import Button from "@/components/Button";
import { useNavigation } from "@/hooks/useNavigate";
import ROUTES from "@/config/routes";

export default function NotFound() {
  const { navigate, goBack } = useNavigation();
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-secondary)] relative overflow-hidden">
      <motion.div
        className="relative z-10 px-4 sm:px-6 lg:px-8 w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.div
            className="mb-6 flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-primary/10 dark:bg-primary/20 rounded-full"
            >
              <Search className="w-12 h-12 text-primary" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-on-background mb-3"
            variants={itemVariants}
          >
            Page Not Found
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-on-background/70 mb-4"
            variants={itemVariants}
          >
            {`Sorry, the page you're looking for doesn't exist or has been moved.
            Let's get you back on track!`}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <div className="w-full sm:w-auto">
              <Button
                onClick={() => navigate(ROUTES.HOME.path)}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-on-primary py-3 px-8 rounded-lg font-semibold transition-all"
              >
                <Home className="w-5 h-5" />
                Go to Home
              </Button>
            </div>
            <Button
              onClick={() => goBack()}
              icon={ArrowLeft}
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary/5 py-3 px-8 rounded-lg font-semibold transition-all"
            >
              {" "}
              Go Back
            </Button>
          </motion.div>

          <p className="mt-6 text-sm text-on-background/60 mb-4">
            Need help? Contact our support team
          </p>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Languages, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import styles from "@/styles/pages/select-language.module.css";
import { useNavigation } from "@/hooks/useNavigate";

export default function SelectLanguage() {
  const { navigate, goBack } = useNavigation();

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={styles.card}
      >
        {/* Animated Icon */}
        <div className={styles.iconWrapper}>
          <Languages size={48} className={styles.icon} />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className={styles.sparkle}
          >
            <Sparkles size={20} />
          </motion.div>
        </div>

        <h1 className={styles.title}>Language Support</h1>
        <p className={styles.description}>
          {`We're teaching OnePe new languages! Soon you'll be able to manage your
          payments in the language you're most comfortable with.`}
        </p>

        <div className={styles.badge}>Coming Soon</div>

        <Button onClick={() => goBack()} className={styles.backBtn}>
          Got it, take me back
        </Button>
      </motion.div>

      <div className={styles.blob} />
    </div>
  );
}

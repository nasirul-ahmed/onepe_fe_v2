"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  CreditCard,
  Shield,
  Bell,
  Moon,
  Sun,
  ChevronRight,
  Edit,
  Phone,
  Mail,
  MapPin,
  Award,
  Wallet,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import ContentLayout from "@/components/ContentLayout";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import styles from "@/styles/pages/profile.module.css";
import Switch from "@/components/Switch";

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme();
  const [user] = useState({
    name: "Rahul Kumar",
    email: "rahul.kumar@email.com",
    phone: "+91 98765 43210",
    address: "Bangalore, Karnataka",
    joinDate: "March 2023",
    kycStatus: "Verified",
    walletTier: "Gold",
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);

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

  const profileMenuItems = [
    { icon: Settings, label: "Account Settings", badge: null },
    { icon: CreditCard, label: "Payment Methods", badge: "2" },
    { icon: Shield, label: "Security & Privacy", badge: null },
    { icon: Bell, label: "Notifications", badge: "New" },
    { icon: Award, label: "Rewards & Offers", badge: "5" },
  ];

  return (
    <ContentLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={styles.container}
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className={styles.profileHeader}>
          <div className={styles.profileHeaderTop}>
            <div className={styles.userInfo}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className={styles.verificationBadge}>
                  <Shield className={styles.verificationIcon} />
                </div>
              </div>
              <div className={styles.userDetails}>
                <h1 className={styles.userName}>{user.name}</h1>
                <div className={styles.userBadges}>
                  <span className={styles.kycBadge}>KYC {user.kycStatus}</span>
                  <span className={styles.tierBadge}>
                    {user.walletTier} Member
                  </span>
                </div>
                <p className={styles.memberSince}>
                  Member since {user.joinDate}
                </p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className={styles.editButton}
            >
              <Edit className={styles.editIcon} />
            </motion.button>
          </div>

          {/* User Details */}
          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <Mail className={styles.contactIcon} />
              <div>
                <p className={styles.contactValue}>{user.email}</p>
                <p className={styles.contactLabel}>Email Address</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <Phone className={styles.contactIcon} />
              <div>
                <p className={styles.contactValue}>{user.phone}</p>
                <p className={styles.contactLabel}>Mobile Number</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <MapPin className={styles.contactIcon} />
              <div>
                <p className={styles.contactValue}>{user.address}</p>
                <p className={styles.contactLabel}>Current Address</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className={styles.quickStats}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Wallet className={styles.statIcon} />
              <span className={styles.statPeriod}>This Month</span>
            </div>
            <h3 className={styles.statValue}>₹15,240</h3>
            <p className={styles.statLabel}>Total Spent</p>
          </div>

          <div className={cn(styles.statCard, styles.statCardGreen)}>
            <div className={styles.statHeader}>
              <Award className={styles.statIcon} />
              <span className={styles.statPeriod}>Available</span>
            </div>
            <h3 className={styles.statValue}>₹1,250</h3>
            <p className={styles.statLabel}>Cashback Earned</p>
          </div>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div variants={itemVariants} className={styles.themeToggle}>
          <div className={styles.themeToggleContent}>
            <div className={styles.themeToggleLeft}>
              {theme === "dark" ? (
                <Moon className={styles.themeIcon} />
              ) : (
                <Sun className={styles.themeIcon} />
              )}
              <div>
                <h3 className={styles.themeTitle}>Theme</h3>
                <p className={styles.themeDescription}>
                  {theme === "dark" ? "Dark mode is on" : "Light mode is on"}
                </p>
              </div>
            </div>
            <div className="h-full">
              <Switch checked={theme === "dark"} onChange={toggleTheme} />
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div variants={itemVariants} className={styles.menuSection}>
          <h3 className={styles.menuSectionTitle}>Settings & Preferences</h3>
          <div className={styles.menuItems}>
            {profileMenuItems.map((item, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.98 }}
                className={styles.menuItem}
              >
                <div className={styles.menuItemLeft}>
                  <item.icon className={styles.menuItemIcon} />
                  <span className={styles.menuItemLabel}>{item.label}</span>
                </div>
                <div className={styles.menuItemRight}>
                  {item.badge && (
                    <span className={styles.menuItemBadge}>{item.badge}</span>
                  )}
                  <ChevronRight className={styles.menuItemChevron} />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className={styles.actionButtons}>
          <Button className={styles.upgradeButton} variant="primary">
            Upgrade to Premium
          </Button>

          <Button className={styles.supportButton} variant="outline">
            Help & Support
          </Button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className={styles.signOutButton}
          >
            Sign Out
          </motion.button>
        </motion.div>
      </motion.div>
    </ContentLayout>
  );
}

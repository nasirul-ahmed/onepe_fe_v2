"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Wallet
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import ContentLayout from '@/components/ContentLayout';
import Button from '@/components/Button';

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme();
  const [user] = useState({
    name: 'Rahul Kumar',
    email: 'rahul.kumar@email.com',
    phone: '+91 98765 43210',
    address: 'Bangalore, Karnataka',
    joinDate: 'March 2023',
    kycStatus: 'Verified',
    walletTier: 'Gold'
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
    { icon: Settings, label: 'Account Settings', badge: null },
    { icon: CreditCard, label: 'Payment Methods', badge: '2' },
    { icon: Shield, label: 'Security & Privacy', badge: null },
    { icon: Bell, label: 'Notifications', badge: 'New' },
    { icon: Award, label: 'Rewards & Offers', badge: '5' },
  ];

  return (
    <ContentLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 pb-6"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="bg-surface rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-surface flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-on-surface mb-1">{user.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-950 text-xs font-bold rounded-full">
                    KYC {user.kycStatus}
                  </span>
                  <span className="px-4 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-950 text-xs font-bold rounded-full">
                    {user.walletTier} Member
                  </span>
                </div>
                <p className="text-sm text-secondary">Member since {user.joinDate}</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="p-2 text-secondary hover:text-on-surface hover:bg-muted rounded-full transition-colors"
            >
              <Edit className="w-5 h-5" />
            </motion.button>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <Mail className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm font-medium text-on-surface">{user.email}</p>
                <p className="text-xs text-secondary">Email Address</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <Phone className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm font-medium text-on-surface">{user.phone}</p>
                <p className="text-xs text-secondary">Mobile Number</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <MapPin className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm font-medium text-on-surface">{user.address}</p>
                <p className="text-xs text-secondary">Current Address</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-6 h-6" />
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">This Month</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">₹15,240</h3>
            <p className="text-blue-100 text-sm">Total Spent</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-6 h-6" />
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Available</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">₹1,250</h3>
            <p className="text-green-100 text-sm">Cashback Earned</p>
          </div>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div variants={itemVariants} className="bg-surface rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="w-6 h-6 text-secondary" />
              ) : (
                <Sun className="w-6 h-6 text-secondary" />
              )}
              <div>
                <h3 className="font-semibold text-on-surface">Theme</h3>
                <p className="text-sm text-secondary">
                  {theme === 'dark' ? 'Dark mode is on' : 'Light mode is on'}
                </p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                theme === 'dark' ? 'bg-primary' : 'bg-border'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div variants={itemVariants} className="bg-surface rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-on-surface mb-4">Settings & Preferences</h3>
          <div className="space-y-1">
            {profileMenuItems.map((item, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-secondary" />
                  <span className="font-medium text-on-surface">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-secondary" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="space-y-3">
          <Button className="w-full" variant="primary">
            Upgrade to Premium
          </Button>
          
          <Button className="w-full" variant="outline">
            Help & Support
          </Button>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full p-3 text-error font-medium rounded-xl border border-error/20 hover:bg-error/5 transition-colors"
          >
            Sign Out
          </motion.button>
        </motion.div>
      </motion.div>
    </ContentLayout>
  );
}

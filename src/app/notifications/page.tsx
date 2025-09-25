"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Gift,
  CreditCard,
  Settings2,
  Trash2,
} from "lucide-react";
import styles from "@/styles/pages/notifications.module.css";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "offer" | "payment" | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionable?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Payment Successful",
    message:
      "Your electricity bill payment of ₹2,450 has been processed successfully.",
    timestamp: "2 minutes ago",
    isRead: false,
    actionable: true,
  },
  {
    id: "2",
    type: "offer",
    title: "Cashback Offer",
    message:
      "Get 10% cashback on your next mobile recharge. Valid till tomorrow!",
    timestamp: "1 hour ago",
    isRead: false,
    actionable: true,
  },
  {
    id: "3",
    type: "warning",
    title: "Bill Due Reminder",
    message:
      "Your DTH recharge is due in 2 days. Recharge now to avoid disconnection.",
    timestamp: "3 hours ago",
    isRead: true,
    actionable: true,
  },
  {
    id: "4",
    type: "info",
    title: "New Feature Available",
    message:
      "You can now set auto-pay for all your recurring bills. Try it now!",
    timestamp: "1 day ago",
    isRead: true,
    actionable: false,
  },
  {
    id: "5",
    type: "payment",
    title: "Wallet Recharged",
    message:
      "₹5,000 has been added to your OnePe wallet from HDFC Bank ***1234.",
    timestamp: "2 days ago",
    isRead: true,
    actionable: false,
  },
  {
    id: "6",
    type: "system",
    title: "Scheduled Maintenance",
    message:
      "Our services will be temporarily unavailable on Sunday 2-4 AM for maintenance.",
    timestamp: "3 days ago",
    isRead: true,
    actionable: false,
  },
];

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const getNotificationIcon = (type: Notification["type"]) => {
    const iconProps = { className: "w-5 h-5" };
    switch (type) {
      case "success":
        return <CheckCircle {...iconProps} />;
      case "warning":
        return <AlertCircle {...iconProps} />;
      case "info":
        return <Info {...iconProps} />;
      case "offer":
        return <Gift {...iconProps} />;
      case "payment":
        return <CreditCard {...iconProps} />;
      case "system":
        return <Settings2 {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const getNotificationIconClass = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return styles.iconSuccess;
      case "warning":
        return styles.iconWarning;
      case "info":
        return styles.iconInfo;
      case "offer":
        return styles.iconOffer;
      case "payment":
        return styles.iconPayment;
      case "system":
        return styles.iconSystem;
      default:
        return styles.iconSystem;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className={styles.notificationsPage}>
      {/* Sticky Header */}
      <div className={styles.stickyHeader}>
        <div className={styles.header}>
          {/* Filter Tabs */}
          <div className={styles.filterTabs}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("all")}
              className={cn(
                styles.filterTab,
                filter === "all" && styles.filterTabActive
              )}
            >
              All ({notifications.length})
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("unread")}
              className={cn(
                styles.filterTab,
                filter === "unread" && styles.filterTabActive
              )}
            >
              Unread ({unreadCount})
            </motion.button>
          </div>

          {unreadCount > 0 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={markAllAsRead}
              className={styles.markAllButton}
            >
              Mark all read
            </motion.button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className={styles.content}>
        {filteredNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.emptyState}
          >
            <div className={styles.emptyStateIcon}>
              <Bell className="w-16 h-16 mx-auto" />
            </div>
            <h3 className={styles.emptyStateTitle}>
              {filter === "unread"
                ? "No unread notifications"
                : "No notifications"}
            </h3>
            <p className={styles.emptyStateDescription}>
              {filter === "unread"
                ? "You're all caught up!"
                : "We'll notify you when something important happens"}
            </p>
          </motion.div>
        ) : (
          <div className={styles.notificationsList}>
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => markAsRead(notification.id)}
                className={cn(
                  styles.notificationItem,
                  !notification.isRead && styles.notificationUnread
                )}
              >
                <div className={styles.notificationHeader}>
                  <div
                    className={cn(
                      styles.notificationIcon,
                      getNotificationIconClass(notification.type)
                    )}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className={styles.notificationContent}>
                    <div className={styles.notificationMeta}>
                      <h3 className={styles.notificationTitle}>
                        {notification.title}
                        {!notification.isRead && (
                          <span className="inline-block w-2 h-2 bg-primary rounded-full ml-2" />
                        )}
                      </h3>
                      <span className={styles.notificationTime}>
                        {notification.timestamp}
                      </span>
                    </div>
                    <p className={styles.notificationMessage}>
                      {notification.message}
                    </p>
                    {notification.actionable && (
                      <div className={styles.notificationActions}>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add action logic here
                          }}
                          className={cn(
                            styles.actionButtonSmall,
                            styles.actionButtonPrimary
                          )}
                        >
                          Take Action
                        </motion.button>
                      </div>
                    )}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className={styles.actionButton}
                  >
                    <Trash2 className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;

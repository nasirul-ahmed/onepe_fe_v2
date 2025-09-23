"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, AlertCircle, Info, Gift, CreditCard, Settings2, Trash2 } from "lucide-react";

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
    message: "Your electricity bill payment of ₹2,450 has been processed successfully.",
    timestamp: "2 minutes ago",
    isRead: false,
    actionable: true,
  },
  {
    id: "2",
    type: "offer",
    title: "Cashback Offer",
    message: "Get 10% cashback on your next mobile recharge. Valid till tomorrow!",
    timestamp: "1 hour ago",
    isRead: false,
    actionable: true,
  },
  {
    id: "3",
    type: "warning",
    title: "Bill Due Reminder",
    message: "Your DTH recharge is due in 2 days. Recharge now to avoid disconnection.",
    timestamp: "3 hours ago",
    isRead: true,
    actionable: true,
  },
  {
    id: "4",
    type: "info",
    title: "New Feature Available",
    message: "You can now set auto-pay for all your recurring bills. Try it now!",
    timestamp: "1 day ago",
    isRead: true,
    actionable: false,
  },
  {
    id: "5",
    type: "payment",
    title: "Wallet Recharged",
    message: "₹5,000 has been added to your OnePe wallet from HDFC Bank ***1234.",
    timestamp: "2 days ago",
    isRead: true,
    actionable: false,
  },
  {
    id: "6",
    type: "system",
    title: "Scheduled Maintenance",
    message: "Our services will be temporarily unavailable on Sunday 2-4 AM for maintenance.",
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
        return <CheckCircle {...iconProps} className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle {...iconProps} className="w-5 h-5 text-orange-500" />;
      case "info":
        return <Info {...iconProps} className="w-5 h-5 text-blue-500" />;
      case "offer":
        return <Gift {...iconProps} className="w-5 h-5 text-purple-500" />;
      case "payment":
        return <CreditCard {...iconProps} className="w-5 h-5 text-cyan-500" />;
      case "system":
        return <Settings2 {...iconProps} className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell {...iconProps} className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationBgColor = (type: Notification["type"], isRead: boolean) => {
    const opacity = isRead ? "5" : "10";
    switch (type) {
      case "success":
        return `bg-green-50 dark:bg-green-900/${opacity}`;
      case "warning":
        return `bg-orange-50 dark:bg-orange-900/${opacity}`;
      case "info":
        return `bg-blue-50 dark:bg-blue-900/${opacity}`;
      case "offer":
        return `bg-purple-50 dark:bg-purple-900/${opacity}`;
      case "payment":
        return `bg-cyan-50 dark:bg-cyan-900/${opacity}`;
      case "system":
        return `bg-gray-50 dark:bg-gray-900/${opacity}`;
      default:
        return `bg-muted`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-surface/80 backdrop-blur-lg border-b border-border sticky top-16 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-on-surface">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-secondary">{unreadCount} unread</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={markAllAsRead}
                  className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  Mark all read
                </motion.button>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={clearAllNotifications}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Clear all notifications"
              >
                <Trash2 className="w-4 h-4 text-secondary" />
              </motion.button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("all")}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                filter === "all"
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-on-surface"
              }`}
            >
              All ({notifications.length})
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("unread")}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                filter === "unread"
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-on-surface"
              }`}
            >
              Unread ({unreadCount})
            </motion.button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 py-2">
        {filteredNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-on-surface mb-2">
              {filter === "unread" ? "No unread notifications" : "No notifications"}
            </h3>
            <p className="text-secondary">
              {filter === "unread" 
                ? "You're all caught up!" 
                : "We'll notify you when something important happens"
              }
            </p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => markAsRead(notification.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.01] ${getNotificationBgColor(
                  notification.type,
                  notification.isRead
                )} ${!notification.isRead ? "border-l-4 border-primary" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold text-sm ${
                          notification.isRead ? "text-secondary" : "text-on-surface"
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${
                        notification.isRead ? "text-secondary" : "text-on-surface"
                      }`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-secondary">
                          {notification.timestamp}
                        </span>
                        {notification.actionable && (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add action logic here
                            }}
                            className="text-xs text-primary font-medium hover:text-primary/80 transition-colors"
                          >
                            Take Action
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-error/10 transition-colors opacity-0 group-hover:opacity-100 ml-2"
                  >
                    <Trash2 className="w-3 h-3 text-secondary hover:text-error" />
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
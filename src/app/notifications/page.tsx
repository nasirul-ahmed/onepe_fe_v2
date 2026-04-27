import NotificationList, { Notification } from "./NotificationList";

async function getNotifications() {
  // In a real app, replace this with: await fetch('https://api.yourdomain.com/notifications')
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

  return mockNotifications;
}

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return <NotificationList initialNotifications={notifications} />;
}

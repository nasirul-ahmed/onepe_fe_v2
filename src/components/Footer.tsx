"use client";

import { Home, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ActiveTab, useAppStore } from "@/store/app-store";

const navItems = [
  { id: ActiveTab.homepage, label: "Home", icon: <Home size={24} /> },
  { id: ActiveTab.profile, label: "Profile", icon: <User size={24} /> },
];

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  const handleClick = (id: ActiveTab) => {
    setActiveTab(id);
    router.push(id);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 p-2">
      <div className="flex justify-around relative">
        {navItems.map((item) => {
          const isActive = pathname === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="relative flex flex-col items-center p-2 transition-colors"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : 1,
                  color: isActive ? "#3b82f6" : "#6b7280",
                }}
                transition={{ duration: 0.2 }}
              >
                {item.icon}
              </motion.div>
              <span
                className={`text-xs mt-1 font-semibold ${
                  isActive
                    ? "text-blue-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 w-8 h-1 bg-blue-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Footer;

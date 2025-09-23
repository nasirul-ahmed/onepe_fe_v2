"use client";

import { Home, User, CreditCard, History } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useDevice } from "@/hooks/useDevice";
import { ROUTE_PATHS } from "@/config/routes";

const navItems = [
  {
    id: ROUTE_PATHS.HOME,
    label: "Home",
    icon: Home,
  },
  {
    id: ROUTE_PATHS.TRANSACTIONS,
    label: "History",
    icon: History,
  },
  {
    id: ROUTE_PATHS.SERVICES,
    label: "Services",
    icon: CreditCard,
  },
  {
    id: ROUTE_PATHS.PROFILE,
    label: "Profile",
    icon: User,
  },
];

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const device = useDevice();

  const handleClick = (route: string) => {
    router.push(route);
  };

  const isIOS = (d: typeof device) => d.os === "iOS" && d.isMobile;

  // Hide footer on splash page
  if (pathname === "/") {
    return null;
  }

  console.log({ device, isIOS: isIOS(device) });

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-surface/90 backdrop-blur-lg border-t border-border fixed bottom-0 left-0 right-0"
    >
      <div className="flex justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.id;
          const IconComponent = item.icon;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleClick(item.id)}
              whileTap={{ scale: 0.95 }}
              className="relative flex flex-col items-center justify-center px-3 py-2 min-w-0 flex-1"
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <IconComponent
                  size={20}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-secondary"
                  }`}
                />
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{
                  fontSize: isActive ? "0.75rem" : "0.7rem",
                  fontWeight: isActive ? 600 : 500,
                }}
                transition={{ duration: 0.2 }}
                className={`mt-1 relative z-10 leading-none transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-secondary"
                }`}
              >
                {item.label}
              </motion.span>

              {/* Active dot */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Safe area padding for iOS */}
      {isIOS(device) && <div className="h-2 bg-surface/90" />}
    </motion.nav>
  );
};

export default Footer;

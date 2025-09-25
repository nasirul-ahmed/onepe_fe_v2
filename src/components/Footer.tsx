"use client";

import { Home, User, CreditCard, History } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useDevice } from "@/hooks/useDevice";
import { ROUTE_PATHS } from "@/config/routes";
import { cn } from "@/lib/utils";
import styles from "@/styles/components/footer.module.css";

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

  // console.log({ device, isIOS: isIOS(device) });

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={styles.nav}
    >
      <div className={styles.container}>
        {navItems.map((item) => {
          const isActive = pathname === item.id;
          const IconComponent = item.icon;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleClick(item.id)}
              whileTap={{ scale: 0.95 }}
              className={styles.navButton}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className={styles.activeIndicator}
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
                className={cn(
                  styles.iconContainer,
                  isActive && styles.iconContainerActive
                )}
              >
                <IconComponent
                  size={20}
                  className={cn(
                    styles.icon,
                    isActive && styles.iconActive
                  )}
                />
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{
                  fontSize: isActive ? "0.75rem" : "0.7rem",
                  fontWeight: isActive ? 600 : 500,
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  styles.label,
                  isActive && styles.labelActive
                )}
              >
                {item.label}
              </motion.span>

              {/* Active dot */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={styles.activeDot}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Safe area padding for iOS */}
      {isIOS(device) && <div className={styles.iosSafeArea} />}
    </motion.nav>
  );
};

export default Footer;

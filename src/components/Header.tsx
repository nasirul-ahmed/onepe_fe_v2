"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Bell, Sun, Moon, Search, ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/app-store";
import { RouteUtils, ROUTE_PATHS } from "@/config/routes";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { showBackButton, previousRoute, handleRouteChange } = useAppStore();

  const changeTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Update navigation state when pathname changes
    if (mounted) {
      handleRouteChange(pathname);
    }
  }, [pathname, mounted, handleRouteChange]);

  const handleBackPress = () => {
    if (previousRoute) {
      router.push(previousRoute);
    } else {
      router.push(ROUTE_PATHS.HOME);
    }
  };

  if (!mounted) {
    return null;
  }

  // Hide header on splash page
  if (pathname === "/") {
    return null;
  }

  const getPageTitle = () => {
    return RouteUtils.getRouteName(pathname);
  };

  const isHomePage = pathname === ROUTE_PATHS.HOME;

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg shadow-sm"
    >
      <div className="px-4 py-3">
        {/* Main Header Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {showBackButton ? (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackPress}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-on-surface" />
                </motion.button>
                <h1 className="font-semibold text-lg text-on-surface">
                  {getPageTitle()}
                </h1>
              </div>
            ) : isHomePage ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1P</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg text-on-surface">OnePe</h1>
                  <p className="text-xs text-secondary -mt-1">
                    Good evening! 👋
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/home">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">1P</span>
                    </div>
                  </motion.button>
                </Link>
                <h1 className="font-semibold text-lg text-on-surface">
                  {getPageTitle()}
                </h1>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Link href="/search">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-muted hover:bg-border text-secondary hover:text-on-surface transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </motion.button>
            </Link>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={changeTheme}
              className="p-2 rounded-full bg-muted hover:bg-border text-secondary hover:text-on-surface transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <Link href="/notifications">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-muted hover:bg-border text-secondary hover:text-on-surface transition-colors relative"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
              </motion.button>
            </Link>

            {/* {isHomePage && (
              <Link href="/profile">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-muted hover:bg-border text-secondary hover:text-on-surface transition-colors"
                  aria-label="Profile"
                >
                  <User size={18} />
                </motion.button>
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;

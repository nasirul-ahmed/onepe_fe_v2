"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Bell, Sun, Moon, Search, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RouteUtils, ROUTE_PATHS } from "@/config/routes";
import { useNavigation } from "@/hooks/useNavigate";

const Header = () => {
  const { navigate, goBack, replace } = useNavigation(); // ← use goBack, not navigate
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (pathname === "/") return null;

  const isHomePage = pathname === ROUTE_PATHS.HOME;
  const showBackButton = RouteUtils.requiresBackButton(pathname);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg shadow-sm"
    >
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center space-x-3">
            {showBackButton ? (
              <>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={goBack} // ← pops the stack, never pushes
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-on-surface" />
                </motion.button>
                <h1 className="font-semibold text-lg text-on-surface">
                  {RouteUtils.getRouteName(pathname)}
                </h1>
              </>
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
                <motion.button
                  onClick={() => replace(ROUTE_PATHS.HOME)}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1P</span>
                  </div>
                </motion.button>
                <h1 className="font-semibold text-lg text-on-surface">
                  {RouteUtils.getRouteName(pathname)}
                </h1>
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => navigate(ROUTE_PATHS.SEARCH)}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-muted hover:bg-border text-secondary hover:text-on-surface transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-muted hover:bg-border text-secondary hover:text-on-surface transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.button
              onClick={() => navigate(ROUTE_PATHS.NOTIFICATIONS)}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-muted hover:bg-border text-secondary hover:text-on-surface transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;

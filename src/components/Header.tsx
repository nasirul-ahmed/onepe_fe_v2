"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Bell, Sun, Moon } from "lucide-react";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const changeTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 shadow-md p-4 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-[var(--color-text-primary)]">
            OnePe
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={changeTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative">
            <button
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

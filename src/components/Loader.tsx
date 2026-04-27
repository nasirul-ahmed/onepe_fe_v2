"use client";
import { useAppStore } from "@/store/app-store";
import { AnimatePresence, motion } from "framer-motion";

const Loader = () => {
  const { isLoading } = useAppStore();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          // 1. Opaque background blocks clicks
          // 2. backdrop-blur makes it look high-end
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <div className="relative">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>

            {/* Pulse dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    // 1. Ensure the parent container is 'relative' to anchor the absolute children
    <div className="relative h-full w-full">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          // 2. ABSOLUTE POSITIONING: This is the key to stopping layout shifts.
          // The container (relative) defines the space, the children (absolute)
          // animate within it without pushing/pulling the grid.
          className="absolute inset-0 will-change-transform"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

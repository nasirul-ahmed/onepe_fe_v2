"use client";

import React, { ReactNode, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  animate,
  PanInfo,
} from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "@/styles/components/modalContainer.module.css";

interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  variant?: "center" | "bottom-sheet";
}

const SIZE_CLASSES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const ModalContainer: React.FC<ModalContainerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  variant = "center",
}) => {
  const isBottomSheet = variant === "bottom-sheet";

  // Shared Y value — handle drag updates this, sheet reads it
  const sheetY = useMotionValue(0);

  // Reset position when sheet opens
  useEffect(() => {
    if (isOpen) sheetY.set(0);
  }, [isOpen, sheetY]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleDragEnd = (
    event: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    if (info.velocity.y > 400 || info.offset.y > 150) {
      // Animate out then close
      animate(sheetY, window.innerHeight, {
        type: "spring",
        stiffness: 380,
        damping: 38,
      }).then(onClose);
    } else {
      // Snap back
      animate(sheetY, 0, {
        type: "spring",
        stiffness: 380,
        damping: 38,
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex justify-center ${
            isBottomSheet ? "items-end" : "items-center"
          }`}
          aria-hidden={false}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Sheet / Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            style={isBottomSheet ? { y: sheetY } : {}}
            drag={isBottomSheet ? "y" : false}
            dragConstraints={isBottomSheet ? { top: 0, bottom: 0 } : undefined}
            dragElastic={isBottomSheet ? { top: 0.05, bottom: 0.8 } : undefined}
            onDragEnd={isBottomSheet ? handleDragEnd : undefined}
            className={cn(
              isBottomSheet
                ? "relative w-full rounded-t-2xl shadow-xl h-[50vh] max-h-[60vh] flex flex-col overflow-hidden"
                : `relative rounded-2xl shadow-xl w-full ${SIZE_CLASSES[size]} max-h-[90vh] flex flex-col overflow-hidden mx-4`,
              !isBottomSheet && "h-[40vh] max-h[40vh]",
              styles.container,
            )}
            initial={
              isBottomSheet ? { y: "100%" } : { opacity: 0, scale: 0.96, y: 8 }
            }
            exit={
              isBottomSheet ? { y: "100%" } : { opacity: 0, scale: 0.96, y: 8 }
            }
            transition={
              isBottomSheet
                ? { type: "spring", stiffness: 380, damping: 38, mass: 0.8 }
                : { duration: 0.18 }
            }
          >
            {/* Handle */}
            {isBottomSheet && (
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0 cursor-grab active:cursor-grabbing touch-none select-none">
                <div className="w-9 h-1 rounded-full bg-gray-300 dark:bg-gray-600 pointer-events-none" />
              </div>
            )}

            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 relative">
                {title && (
                  <h2
                    id="modal-title"
                    className="text-lg font-semibold text-[var(--color-on-background)]"
                  >
                    {title}
                  </h2>
                )}

                {showCloseButton && !isBottomSheet && (
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute right-3 top-3 inline-flex items-center justify-center rounded-md p-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 8.586L15.95 2.636a1 1 0 111.414 1.414L11.414 10l5.95 5.95a1 1 0 01-1.414 1.414L10 11.414l-5.95 5.95a1 1 0 01-1.414-1.414L8.586 10 2.636 4.05A1 1 0 014.05 2.636L10 8.586z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            {/* <div className="overflow-y-auto flex-1 overscroll-contain pt-2 pb-12 px-4">
              {children}
            </div> */}

            <div className="overflow-y-auto flex-1 overscroll-contain pt-2 pb-12 px-4 modal-scrollbar max-h-[70vh]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalContainer;

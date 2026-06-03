"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { ModalContent } from "./modals/ModalContent";
import styles from "@/styles/components/modalContainer.module.css";

const getSizeClass = (size?: string) => {
  switch (size) {
    case "sm":
      return "h-[30vh] max-w-md";
    case "md":
      return "h-[40vh] max-w-lg";
    case "lg":
      return "h-[50vh] max-w-2xl";
    case "xl":
      return "h-[60vh] max-w-4xl";
    case "2xl":
      return "h-[70vh] max-w-6xl";
    default:
      return "h-[50vh] max-w-lg";
  }
};

export default function ModalContainer({ classes }: { classes?: string }) {
  const [mounted, setMounted] = useState(false);
  const { modal, closeModal } = useAppStore();
  const isOpen = !!modal;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scrolling when modal is active
  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow || "unset";
      };
    }
  }, [isOpen, mounted]);

  // Handle escape key closure
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (modal?.props?.closeOnOverlayClick ?? true)) {
        closeModal();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, closeModal, modal]);

  if (!mounted || !isOpen) return null;

  const {
    size,
    title = "",
    showCloseButton = true,
    closeOnOverlayClick = true,
  } = modal.props;

  // Assumes getModalRoot setup is initialized here
  const portalContainer =
    document.getElementById("global-modal-root") || document.body;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop Layer */}
        <motion.div
          className="absolute inset-0 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeOnOverlayClick ? closeModal : undefined}
        />

        {/* Core Window Layer */}
        <motion.div
          className={cn(
            "relative flex bg-surface flex-col overflow-hidden shadow-elevation-4 w-full rounded-2xl",
            getSizeClass(size),
            styles.container,
            classes,
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          {/* Layout Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant flex-shrink-0">
              {title && (
                <h2 className="text-lg font-bold text-on-surface">{title}</h2>
              )}
              {showCloseButton && (
                <button
                  onClick={closeModal}
                  aria-label="Close modal window"
                  className={cn(
                    "p-1.5 rounded-full bg-surface-variant text-on-surface-variant",
                    !title && "ml-auto",
                  )}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          )}

          {/* Dynamic View Injection Surface Slot */}
          <div className="overflow-y-auto flex-1 overscroll-contain px-5 pt-4 pb-6 modal-scrollbar">
            <ModalContent />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    portalContainer,
  );
}

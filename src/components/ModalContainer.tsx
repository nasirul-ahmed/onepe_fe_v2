"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { ModalContent } from "./modals/ModalContent";
import styles from "@/styles/components/modalContainer.module.css";

const getSizeClass = (size: "sm" | "md" | "lg" | "xl" | "2xl") => {
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

let modalRoot: HTMLDivElement | null = null;
const getModalRoot = () => {
  if (typeof window === "undefined") return null;
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "global-modal-root";
    document.body.appendChild(modalRoot);
  }
  return modalRoot;
};

interface ModalContainerProps {
  classes?: string;
}

export default function ModalContainer({ classes }: ModalContainerProps) {
  const [mounted, setMounted] = useState(false);
  const { activeModal, closeModal, modalData } = useAppStore();
  const isOpen = !!activeModal;

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
      if (e.key === "Escape" && (modalData?.closeOnOverlayClick ?? true)) {
        closeModal();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, closeModal, modalData]);

  if (!mounted) return null;

  // Destructure configuration variables safely
  const size = (modalData?.size || "md") as "sm" | "md" | "lg" | "xl" | "2xl";
  const title = modalData?.title || "";
  const showCloseButton = modalData?.showCloseButton ?? true;
  const closeOnOverlayClick = modalData?.closeOnOverlayClick ?? true;

  const portalContainer = getModalRoot();
  if (!portalContainer) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
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
            transition={{ duration: 0.2 }}
            onClick={closeOnOverlayClick ? closeModal : undefined}
          />

          {/* Core Window Layer */}
          <motion.div
            className={cn(
              "relative flex bg-surface flex-col overflow-hidden shadow-elevation-4 w-full rounded-2xl",
              getSizeClass(size),
              styles.container,
              classes
            )}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
          >
            {/* Layout Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant flex-shrink-0 relative">
                {title && (
                  <h2 className="text-lg font-bold tracking-wide text-on-surface">
                    {title?.toString() || ""}
                  </h2>
                )}

                {showCloseButton && (
                  <button
                    onClick={closeModal}
                    aria-label="Close modal window"
                    className={cn(
                      "inline-flex items-center justify-center rounded-full p-1.5 text-on-surface-variant bg-surface-variant hover:bg-surface-variant/80 transition-colors",
                      !title && "ml-auto"
                    )}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            )}

            {/* Dynamic View Injection Surface Slot */}
            <div className="overflow-y-auto flex-1 overscroll-contain px-5 pt-4 pb-6 modal-scrollbar">
              <ModalContent modalId={activeModal} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalContainer
  );
}
"use client";

import React, { ComponentType, lazy, LazyExoticComponent } from "react";
import { useAppStore, MODAL_TYPES } from "@/store/app-store";

interface ModalProps {
  data: Record<string, unknown> | unknown;
}

type ModalComponentType =
  | ComponentType<ModalProps>
  | LazyExoticComponent<ComponentType<ModalProps>>;

const genericLazy = <T,>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
) => {
  return lazy(importFn) as unknown as LazyExoticComponent<
    ComponentType<ModalProps>
  >;
};

const ConfirmPaymentModal = (_props: ModalProps) => (
  <div className="p-2">Confirm Payment</div>
);

const modalComponents: Record<string, ModalComponentType> = {
  [MODAL_TYPES.CONFIRM_PAYMENT]: ConfirmPaymentModal,
  [MODAL_TYPES.SHOW_ALL_SERVICES]: genericLazy(
    () => import("./AllServicesModal"),
  ),
};

interface ModalContentProps {
  modalId: string | null;
}

export function ModalContent({ modalId }: ModalContentProps) {
  const { modalData } = useAppStore();

  if (!modalId || !modalData) return null;

  const ModalComponent =
    modalComponents[modalId as keyof typeof modalComponents];

  if (!ModalComponent) return null;

  return <ModalComponent data={modalData.childrenProps} />;
}

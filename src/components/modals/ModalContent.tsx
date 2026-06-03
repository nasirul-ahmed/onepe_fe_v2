"use client";

import React from "react";
import { useAppStore, MODAL_TYPES } from "@/store/app-store";
import AllServicesModal from "./AllServicesModal";

const ConfirmPaymentModal = () => <div className="p-2">Confirm Payment</div>;

export function ModalContent() {
  const modal = useAppStore((st) => st.modal);

  if (!modal) return null;
  console.log({ modal });
  switch (modal.type) {
    case MODAL_TYPES.CONFIRM_PAYMENT:
      return <ConfirmPaymentModal />;
    case MODAL_TYPES.SHOW_ALL_SERVICES:
      return <AllServicesModal services={modal?.props?.services} />;
    default:
      return null;
  }
}

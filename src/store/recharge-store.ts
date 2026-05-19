import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MobileRechargePlan } from "@/lib/interfaces/recharge.interface";

const MOBILE_RECHARGE_SESSION = "mobile-recharge-session";

export interface Contact {
  name?: string;
  phone: string;
  operator?: string;
  circle?: string;
  isDue?: boolean;
  lastRechargedAt?: Date | string;
  timestamp?: number;
}

interface RechargeState {
  selectedContact: Contact | null;
  selectedPlan: MobileRechargePlan | null;
  appliedOfferId: string | null;
  setSelectedContact: (contact: Partial<Contact>) => void;
  setSelectedPlan: (plan: MobileRechargePlan) => void;
  setOffer: (offerId: string | null) => void;
  resetPlan: () => void;
  reset: () => void;
}

export const useRechargeStore = create<RechargeState>()(
  persist(
    (set) => ({
      selectedContact: null,
      selectedPlan: null,
      appliedOfferId: null,
      setSelectedContact: (contact) =>
        set((state) => ({
          selectedContact: { ...state.selectedContact, ...contact } as Contact,
        })),
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),
      setOffer: (offerId) => set({ appliedOfferId: offerId }),
      resetPlan: () =>
        set({
          selectedPlan: null,
          appliedOfferId: null,
        }),
      reset: () =>
        set({
          selectedContact: null,
          selectedPlan: null,
          appliedOfferId: null,
        }),
    }),
    {
      name: MOBILE_RECHARGE_SESSION,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

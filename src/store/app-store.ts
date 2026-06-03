import { create } from "zustand";
import { ROUTE_PATHS } from "@/config/routes";
import { ServicesCategory } from "@/components/modals/AllServicesModal";

export const ActiveTab = {
  homepage: ROUTE_PATHS.HOME,
  profile: ROUTE_PATHS.PROFILE,
} as const;

export type ActiveTab = (typeof ActiveTab)[keyof typeof ActiveTab];

export const SHEET_TYPES = {
  PLANS_FILTERS: "plans-filters",
  CONTACT_OPTIONS: "contact-options",
  RECHARGE_OFFERS: "recharge-offers",
  PLAN_DETAILS: "plan-details",
} as const;

export const MODAL_TYPES = {
  CONFIRM_PAYMENT: "confirm-payment",
  SHOW_ALL_SERVICES: "show-all-service",
} as const;

export type SheetType = (typeof SHEET_TYPES)[keyof typeof SHEET_TYPES];
export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];
export interface BaseModalConfig {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  title: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export type ModalPayloadMap = {
  [MODAL_TYPES.CONFIRM_PAYMENT]: BaseModalConfig & {
    amount: number;
  };
  [MODAL_TYPES.SHOW_ALL_SERVICES]: BaseModalConfig & {
    services?: ServicesCategory[];
  };
};

export type ActiveModalState =
  | {
      [K in ModalType]: {
        type: K;
        props: ModalPayloadMap[K];
      };
    }[ModalType]
  | null;

interface AppState {
  activeTab: ActiveTab;
  isLoading: boolean;

  // BottomSheet related states
  activeSheet: string | null;
  sheetData: Record<string, unknown> | null;

  // Modal related states
  modal: ActiveModalState;
  openModal: <T extends ModalType>(type: T, props: ModalPayloadMap[T]) => void;
  closeModal: () => void;
  isModalOpen: (id: ModalType) => boolean;

  setActiveTab: (tab: ActiveTab) => void;
  setLoading: (loading: boolean) => void;
  openSheet: (id: string, data?: Record<string, unknown>) => void;
  closeSheet: () => void;
  isSheetOpen: (id: SheetType) => boolean;
}

export const useAppStore = create<AppState>()((set, get) => ({
  activeTab: ActiveTab.homepage,
  isLoading: false,
  activeSheet: null,
  sheetData: null,
  modal: null,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setLoading: (loading) => set({ isLoading: loading }),

  openSheet: (id, data = {}) =>
    set({
      activeSheet: id,
      sheetData: data,
    }),

  closeSheet: () =>
    set({
      activeSheet: null,
      sheetData: null,
    }),

  isSheetOpen: (id) => get().activeSheet === id,

  openModal: (type, props) =>
    set({
      modal: { type, props } as ActiveModalState,
    }),

  closeModal: () => set({ modal: null }),

  isModalOpen: (id) => get().modal?.type === id,
}));

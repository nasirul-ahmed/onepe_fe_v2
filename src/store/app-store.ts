import { create } from "zustand";
import { ROUTE_PATHS } from "@/config/routes";

export const ActiveTab = {
  homepage: ROUTE_PATHS.HOME,
  profile: ROUTE_PATHS.PROFILE,
} as const;

export type ActiveTab = (typeof ActiveTab)[keyof typeof ActiveTab];

export const SHEET_TYPES = {
  PLANS_FILTERS: "plans-filters",
} as const;

export const MODAL_TYPES = {
  CONFIRM_PAYMENT: "confirm-payment",
  SHOW_ALL_SERVICES: "show-all-service",
} as const;

export type SheetType = (typeof SHEET_TYPES)[keyof typeof SHEET_TYPES];
export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];
export interface ModalProps {
  size?: string;
  title: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  childrenProps?: Record<string, unknown>;
}

interface AppState {
  activeTab: ActiveTab;
  isLoading: boolean;

  // BottomSheet related states
  activeSheet: string | null;
  sheetData: Record<string, unknown> | null;

  // Modal related states
  activeModal: string | null;
  modalData: ModalProps | null; // dynamic props for a modal

  setActiveTab: (tab: ActiveTab) => void;
  setLoading: (loading: boolean) => void;
  openSheet: (id: string) => void;
  closeSheet: () => void;
  isSheetOpen: (id: SheetType) => boolean;

  // Modal Actions
  openModal: (id: string, data?: ModalProps) => void;
  closeModal: () => void;
  isModalOpen: (id: ModalType) => boolean;
}

export const useAppStore = create<AppState>()((set, get) => ({
  activeTab: ActiveTab.homepage,
  isLoading: false,

  activeSheet: null,
  sheetData: null,

  activeModal: null,
  modalData: null,

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

  openModal: (id, data: ModalProps = { title: "Modal" }) =>
    set({
      activeModal: id,
      modalData: data,
    }),

  closeModal: () =>
    set({
      activeModal: null,
      modalData: null,
    }),

  isModalOpen: (id) => get().activeModal === id,
}));

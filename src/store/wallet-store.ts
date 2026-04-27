import { create } from "zustand";

export type TransactionType = "credit" | "debit" | "refund";

export interface WalletTransaction {
  amount: number;
  type: TransactionType;
  timestamp: string;
}

interface WalletState {
  balance: number;
  walletHistory: WalletTransaction[];
  setBalance: (balance: number) => void;
  setWalletHistory: (history: WalletTransaction[]) => void;
  resetWallet: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  balance: 0,
  walletHistory: [],

  setBalance: (balance) => set({ balance }),

  setWalletHistory: (walletHistory) => set({ walletHistory }),

  resetWallet: () => set({ balance: 0, walletHistory: [] }),
}));

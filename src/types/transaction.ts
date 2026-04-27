export type TransactionType = "credit" | "debit";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface TransactionItem {
  id: string;
  userId: string;
  walletId: string;
  amount: number;
  currency: string;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  reference: string;
  provider: string;
  providerReferenceId: string | null;
  category: string | null;
  idempotencyKey: string;
  createdAt: string;
  completedAt: string | null;
}

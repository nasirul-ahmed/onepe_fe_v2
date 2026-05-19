export interface WalletTopup {
  id: string;
  referenceId: string;
  transactionId: string | null;
  userId: string;
  amount: number;
  currency: string;
  gateway: string;
  gatewayOrderId: string | null;
  gatewayPaymentId: string | null;
  status: string;
  description: string | null;
  receipt: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

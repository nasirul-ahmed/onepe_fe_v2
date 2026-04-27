import { load } from '@cashfreepayments/cashfree-js';

export interface CashfreeCheckoutResult {
  paymentDetails: {
    paymentMessage: string;
    paymentStatus: 'SUCCESS' | 'FAILED' | 'PENDING' | 'CANCELLED';
    orderId: string;
  };
}

let cashfreeInstance: Awaited<ReturnType<typeof load>> | null = null;

// Singleton — load SDK once, reuse
const getCashfree = async () => {
  if (!cashfreeInstance) {
    cashfreeInstance = await load({
      mode: process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production'
        ? 'production'
        : 'sandbox',
    });
  }
  return cashfreeInstance;
};

export const triggerCashfreePayment = async (
  paymentSessionId: string,
): Promise<CashfreeCheckoutResult> => {
  const cashfree = await getCashfree();

  // _modal = popup overlay, returns a promise with result
  const result = await cashfree.checkout({
    paymentSessionId,
    redirectTarget: '_modal',
  }) as CashfreeCheckoutResult;

  return result;
};
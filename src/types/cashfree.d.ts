declare module "@cashfreepayments/cashfree-js" {
  export type CashfreeMode = "sandbox" | "production";

  export type RedirectTarget =
    | "_self"
    | "_blank"
    | "_top"
    | "_modal"
    | HTMLElement;

  export type PaymentStatus = "SUCCESS" | "FAILED" | "PENDING" | "CANCELLED";

  export interface CashfreeLoadOptions {
    mode: CashfreeMode;
  }

  export interface CashfreeCheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: RedirectTarget;
  }

  export interface CashfreeCheckoutResult {
    paymentDetails: {
      paymentMessage: string;
      paymentStatus: PaymentStatus;
      orderId: string;
    };
  }

  export interface CashfreeInstance {
    checkout(options: CashfreeCheckoutOptions): Promise<CashfreeCheckoutResult>;
  }

  export function load(options: CashfreeLoadOptions): Promise<CashfreeInstance>;
}

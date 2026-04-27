let scriptLoaded = false;

export const loadRazorpay = (): Promise<boolean> => {
  if (scriptLoaded || window.Razorpay) {
    scriptLoaded = true;
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src   = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload  = () => { scriptLoaded = true; resolve(true); };
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  orderId: string;
  name?: string;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
}

export const triggerRazorpayPayment = (
  options: RazorpayCheckoutOptions,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key:      options.key,
      amount:   options.amount,
      currency: options.currency,
      order_id: options.orderId,
      name:        options.name        ?? 'OnePe',
      description: options.description ?? 'Wallet top-up',
      prefill: options.prefill ?? {},
      handler: () => resolve(),   // payment done — webhook does the real work
      modal: {
        ondismiss: () => reject(new Error('Payment cancelled')),
      },
    });
    rzp.open();
  });
};
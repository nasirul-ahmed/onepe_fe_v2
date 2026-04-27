import { loadRazorpay } from "@/lib/payments-gateway/razorpay";
import WalletTopupView from "./WalletTopupView";

interface WalletTopupProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WalletTopup({ searchParams }: WalletTopupProps) {
  const { amount: _amount } = await searchParams;
  const amount = _amount ? Number(_amount) : undefined;

  return (
    <div className="min-h-screen">
      <WalletTopupView amount={amount} />
    </div>
  );
}

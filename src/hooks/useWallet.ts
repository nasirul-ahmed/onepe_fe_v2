import { triggerCashfreePayment } from "@/lib/payments-gateway/cashfree";
import httpClient from "@/lib/httpClient";
import {
  getBalance,
  getTransactions,
  getWalletTopuopHistory,
  initiateTopup,
} from "@/services/wallet.services";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useUserProfile } from "./useAuth";
import {
  loadRazorpay,
  triggerRazorpayPayment,
} from "@/lib/payments-gateway/razorpay";
import { Paginated } from "@/types/paginated";
import { TransactionItem } from "@/types/transaction";
import { WalletTopup } from "@/lib/interfaces/common.interface";

interface TopupOrderResponse {
  gateway: "razorpay" | "cashfree";
  // Razorpay fields
  key?: string;
  amount?: number;
  currency?: string;
  orderId?: string;
  // Cashfree fields
  paymentSessionId?: string;
}

type TopupStatus = "success" | "cancelled" | "failed";

interface UseWalletTopupResult {
  topup: (amount: number) => Promise<TopupStatus>;
  isLoading: boolean;
}

export function useWalletBalance() {
  return useQuery({
    queryKey: ["wallet", "balance"],
    queryFn: () => getBalance(),
    staleTime: 5000,
    meta: {
      globalLoading: false,
    },
  });
}

export function useWalletTopup(): UseWalletTopupResult {
  const queryClient = useQueryClient();
  const { data: user } = useUserProfile();

  const createOrder = useMutation({
    mutationFn: (amount: number) =>
      httpClient
        .post<TopupOrderResponse>("/wallet/topup-initiate", { amount })
        .then((r) => r.data),
  });

  const topup = async (amount: number): Promise<TopupStatus> => {
    const order = await createOrder.mutateAsync(amount);

    try {
      if (order.gateway === "razorpay") {
        const loaded = await loadRazorpay();
        if (!loaded) throw new Error("Razorpay SDK failed to load");

        await triggerRazorpayPayment({
          key: order.key!,
          amount: order.amount!,
          currency: order.currency!,
          orderId: order.orderId!,
          prefill: {
            name: `${user?.firstName} ${user?.lastName}`,
            email: user?.email,
            contact: user?.phone,
          },
        });
      }

      if (order.gateway === "cashfree") {
        const result = await triggerCashfreePayment(order.paymentSessionId!);

        // Cashfree gives us status directly from the popup promise
        if (result.paymentDetails.paymentStatus === "FAILED") return "failed";
        if (result.paymentDetails.paymentStatus === "CANCELLED")
          return "cancelled";
      }

      // Webhook will credit wallet — just invalidate so balance refetches
      queryClient.invalidateQueries({ queryKey: ["wallet", "balance"] });
      return "success";
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "Payment cancelled")
        return "cancelled";
      return "failed";
    }
  };

  return {
    topup,
    isLoading: createOrder.isPending,
  };
}

export function useTransactionHistory(limit = 10) {
  return useInfiniteQuery<Paginated<TransactionItem>>({
    queryKey: ["transaction-history", limit],
    queryFn: ({ pageParam = 1 }) =>
      getTransactions<Paginated<TransactionItem>>({
        page: Number(pageParam),
        limit,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.morePages ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });
}

export function useWalletTopupHistory(limit = 20) {
  return useInfiniteQuery<Paginated<WalletTopup>>({
    queryKey: ["wallet-topups"],
    queryFn: ({ pageParam = 1 }) =>
      getWalletTopuopHistory<Paginated<WalletTopup>>({
        page: Number(pageParam),
        limit,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.morePages ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });
}

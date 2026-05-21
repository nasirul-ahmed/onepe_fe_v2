"use client";

import React from "react";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  Phone,
  ArrowRight,
  Share2,
  Download,
  IndianRupee,
  Loader2,
} from "lucide-react";
import { Typography } from "@/components/Typography";
import Button from "@/components/Button";
import { useSearchParams } from "next/navigation";
import { getServiceOrderStatus } from "@/services/serviceOrder.service";
import { useQuery } from "@tanstack/react-query";
import { useRechargeStore } from "@/store/recharge-store";

interface RechargeStatusViewProps {
  onDone: () => void;
  onRetry?: () => void;
}

const POLLING_TIMEOUT = 5 * 60 * 1000; // 5 mins

export function RechargeStatusView({
  onDone,
  onRetry,
}: RechargeStatusViewProps) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || null;
  const reset = useRechargeStore().reset;

  const {
    data: order,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderStatus", orderId],
    queryFn: () => getServiceOrderStatus(orderId || ""),

    refetchInterval: (query) => {
      const currentData = query.state.data;
      const firstSuccessTime = query.state.dataUpdatedAt;

      // If no data has arrived yet, don't schedule a poll cycle
      if (!currentData) return false;

      // Stop polling if the server reports a terminal state
      if (currentData.isTerminal) return false;

      // Stop polling if the total elapsed time exceeds the limit
      const elapsedTime = Date.now() - firstSuccessTime;
      if (elapsedTime > POLLING_TIMEOUT) {
        console.warn(
          `Polling stopped: Order ${orderId} timed out after 5 minutes.`,
        );
        return false;
      }

      // Continue polling every 3 seconds if all conditions pass
      return 3000;
    },
    // Optional: Keep polling even if the user switches browser tabs
    refetchIntervalInBackground: true,
  });

  const orderStatus = order?.status?.toLowerCase();
  console.log({ orderStatus });
  const statusConfig = {
    success: {
      icon: (
        <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-scale-up" />
      ),
      title: "Recharge Successful",
      subtitle: "Your recharge has been processed successfully.",
    },
    failed: {
      icon: <XCircle className="w-16 h-16 text-rose-500" />,
      title: "Recharge Failed",
      subtitle: "Your money will be refunded if debited.",
    },
    pending: {
      icon: <AlertCircle className="w-16 h-16 text-amber-500 animate-pulse" />,
      title: "Recharge Pending",
      subtitle: "We are waiting for operator confirmation.",
    },
  }[orderStatus || "pending"];

  React.useEffect(() => {
    reset();
  }, []);

  if (!orderId) return <div>Inalid orderID</div>;

  return (
    <div className="flex-1 flex flex-col h-full bg-surface">
      {/* Top Status Header */}
      <div
        className={`flex-none flex flex-col items-center text-center p-8 pt-12 bg-surface-1 rounded-b-[2.5rem]`}
      >
        {(isLoading || isFetching || orderStatus === "processing") && (
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin " size={30} />
            Please wait, your transaction is in progress!
          </div>
        )}
        <div className="mb-4">{statusConfig?.icon}</div>
        <Typography variant="h4" weight="bold" className="mb-1 text-center">
          {statusConfig?.title}
        </Typography>
        <Typography
          variant="p"
          className="text-on-surface-variant max-w-[280px] text-center"
        >
          {statusConfig?.subtitle}
        </Typography>

        <Typography variant="h1" weight="bold" className="mt-6 text-4xl">
          ₹{order?.amount}
        </Typography>
      </div>

      {/* Transaction Breakdown Card */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="bg-surface rounded-3xl p-5 border border-outline-variant space-y-4 shadow-sm">
          <Typography
            variant="medium"
            weight="bold"
            className="text-on-surface-variant tracking-wider uppercase text-[11px]"
          >
            Transaction Details
          </Typography>

          {/* Consumer Info */}
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Phone size={16} />
              <Typography variant="medium">Mobile Number</Typography>
            </div>
            <Typography variant="medium" weight="bold">
              {order?.targetIdentifier}
            </Typography>
          </div>

          {/* Plan Info */}
          <div className="flex justify-between items-start py-1">
            <div className="flex items-center gap-2 text-on-surface-variant mt-0.5">
              <ArrowRight size={16} />
              <Typography variant="medium">Plan Packed</Typography>
            </div>
            <Typography
              variant="medium"
              weight="bold"
              className="text-right max-w-[180px] line-clamp-2"
            >
              <div className="flex gap-0 items-center">
                <IndianRupee size={18} />
                {order?.amount}
              </div>
            </Typography>
          </div>

          <div className="border-t border-dashed border-outline-variant my-2" />

          {/* Order ID */}
          <div className="flex justify-between items-center py-1">
            <Typography variant="medium" className="text-on-surface-variant">
              OnePe Order ID
            </Typography>
            <Typography
              variant="medium"
              className="font-mono text-xs font-semibold select-all text-right"
            >
              {orderId}
            </Typography>
          </div>

          {/* Date & Time */}
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Calendar size={16} />
              <Typography variant="medium">Date & Time</Typography>
            </div>
            <Typography
              variant="medium"
              className="text-on-surface-variant font-medium text-right"
            >
              {new Date(order?.completedAt || new Date())?.toLocaleDateString()}
            </Typography>
          </div>
        </div>

        {/* Quick Utilities (Only display on success) */}
        {orderStatus === "success" && (
          <div className="flex gap-3">
            <button className="flex-1 py-3 px-4 rounded-xl border border-outline-variant flex items-center justify-center gap-2 text-sm font-medium active:bg-surface-variant/20 transition-colors">
              <Share2 size={16} /> Share Receipt
            </button>
            <button className="flex-1 py-3 px-4 rounded-xl border border-outline-variant flex items-center justify-center gap-2 text-sm font-medium active:bg-surface-variant/20 transition-colors">
              <Download size={16} /> Download
            </button>
          </div>
        )}

        <div className="bg-surface gap-3">
          {orderStatus === "failed" && onRetry ? (
            <>
              <Button
                variant="outline"
                onClick={onDone}
                className="flex-1 py-4 rounded-full border-outline font-bold"
              >
                Go Home
              </Button>
              <Button
                onClick={onRetry}
                className="flex-1 py-4 rounded-full bg-blue-900 hover:bg-blue-800 text-white font-bold"
              >
                Retry Payment
              </Button>
            </>
          ) : (
            <Button
              onClick={onDone}
              className="w-full py-4 rounded-full bg-blue-900 hover:bg-blue-800 text-white font-bold text-lg"
            >
              {orderStatus === "pending"
                ? "Check Status Later"
                : "Continue using our services"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

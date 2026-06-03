"use client";

import { IndianRupee, Zap, LucideWallet } from "lucide-react";
import React, { useState } from "react";
import styles from "@/styles/components/wallet.module.css";
import { cn } from "@/lib/utils";
import { useWalletBalance } from "@/hooks/useWallet";
import LoadingDots from "./LoadingDots";
import { useWalletStore } from "@/store/wallet-store";
import Button from "./Button";
import { useNavigation } from "@/hooks/useNavigate";
import ROUTES from "@/config/routes";
import { Typography } from "./Typography";
import GlowCard from "./GlowCard";

const Wallet = () => {
  const { navigate } = useNavigation();

  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const handleAddMoney = (amount: number) => {
    navigate(`${ROUTES.WALLET_TOPUP.path}?amount=${amount}`);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const balance = useWalletStore((s) => s.balance);
  const setBalance = useWalletStore((s) => s.setBalance);

  const {
    data: walletBalance,
    refetch: refetchWallet,
    isLoading: isBalanceLoading,
    isRefetching,
  } = useWalletBalance();

  React.useEffect(() => {
    if (walletBalance?.availableBalance !== undefined) {
      setBalance(walletBalance.availableBalance);
    }
  }, [walletBalance?.availableBalance, setBalance]);

  return (
    <div className="flex-none">
      <GlowCard className="px-4 pt-3 pb-3">
        <div className="flex items-center justify-between">
          {/* left */}
          <div className="flex flex-col justify-between">
            <Typography
              variant="small"
              className="uppercase tracking-[0.1em] text-on-surface-variant font-bold"
            >
              Wallet Balance
            </Typography>

            <div className="mt-3 flex items-center gap-2 rounded-full">
              <div
                className="
                    flex h-6 w-6 items-center justify-center
                    rounded-full
                    bg-primary-container
                    text-on-primary-container"
              >
                <IndianRupee size={12} />
              </div>

              <Typography
                variant="h6"
                weight="semibold"
                className="leading-none text-on-surface tracking-[0.05em]"
              >
                {isBalanceLoading || isRefetching ? (
                  <LoadingDots />
                ) : (
                  balance?.toFixed(2)
                )}
              </Typography>
            </div>

            <Button
              className="
                    mt-4
                    w-fit
                    rounded-full
                    border border-outline-variant
                    bg-surface-2
                    px-4 py-2
                    text-xs font-medium
                    text-on-surface"
              onClick={(e) => {
                e?.stopPropagation();
                refetchWallet();
              }}
              disabled={isBalanceLoading}
            >
              Refresh Balance
            </Button>
          </div>

          {/* right */}
          <div className="flex flex-col justify-center items-end gap-2">
            <div
              className="
                flex flex-col h-14 w-14 items-center justify-center
                rounded-2xl
                border border-outline-variant
                bg-surface-2
                text-primary
                shadow-elevation-1"
            >
              <Zap size={30} fill="currentColor" />
            </div>
            <Button
              size="sm"
              className={cn(styles.actionButton, styles.actionButtonPrimary)}
              onClick={() => handleAddMoney(0)}
            >
              {/* <Plus className={styles.actionIcon} /> */}
              <LucideWallet size={14} />
              <span className="font-semibold text-sm">Add Money</span>
            </Button>
          </div>
        </div>
      </GlowCard>
    </div>
  );
};

export default Wallet;

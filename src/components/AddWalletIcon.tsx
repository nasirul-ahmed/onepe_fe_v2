import React from "react";

interface AddWalletIconProps {
  size?: number;
  className?: string;
}

export default function AddWalletIcon({
  size = 40,
  className = "",
}: AddWalletIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Money notes */}
      <path d="M40 28L78 14L95 39L58 51L40 28Z" fill="currentColor" />

      <path d="M32 38L88 22L104 52L48 67L32 38Z" fill="currentColor" />

      {/* Wallet body */}
      <rect x="20" y="40" width="76" height="58" rx="10" fill="currentColor" />

      {/* Wallet stitches */}
      <path
        d="M30 50H86"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="5 5"
      />

      <path
        d="M86 50V88"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="5 5"
      />

      <path
        d="M30 88H86"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="5 5"
      />

      {/* Wallet strap */}
      <rect x="74" y="58" width="34" height="22" rx="7" fill="currentColor" />

      <circle cx="85" cy="69" r="5" fill="white" />

      {/* Plus badge */}
      <circle
        cx="24"
        cy="92"
        r="20"
        fill="currentColor"
        stroke="white"
        strokeWidth="3"
      />

      <path
        d="M24 82V102"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M14 92H34"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

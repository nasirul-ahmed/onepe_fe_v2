import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ProfileIcon1 = ({ size = 64, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="32" cy="32" r="32" fill="#2563EB" />
    <circle cx="32" cy="24" r="10" fill="white" />
    <path d="M16 52C18 43 24 38 32 38C40 38 46 43 48 52" fill="white" />
  </svg>
);

export const ProfileIcon2 = ({ size = 64, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="64" height="64" rx="20" fill="#7C3AED" />
    <circle cx="32" cy="22" r="9" fill="white" />
    <rect x="18" y="36" width="28" height="16" rx="8" fill="white" />
  </svg>
);

export const ProfileIcon3 = ({ size = 64, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="32" cy="32" r="32" fill="#059669" />

    <path d="M20 50C20 42 25 36 32 36C39 36 44 42 44 50" fill="white" />

    <circle cx="32" cy="24" r="8" fill="white" />

    <path
      d="M26 22C27 18 30 16 32 16C34 16 37 18 38 22"
      stroke="#059669"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const ProfileIcon4 = ({ size = 64, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="64" height="64" rx="18" fill="#EA580C" />

    <circle cx="32" cy="22" r="9" fill="white" />

    <path d="M18 50C20 42 25 38 32 38C39 38 44 42 46 50" fill="white" />

    <circle cx="24" cy="22" r="2" fill="#EA580C" />
    <circle cx="40" cy="22" r="2" fill="#EA580C" />
  </svg>
);

export const ProfileIcon5 = ({ size = 64, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="32" cy="32" r="32" fill="#DC2626" />

    <circle cx="32" cy="24" r="8" fill="white" />

    <path d="M16 50C18 42 24 38 32 38C40 38 46 42 48 50" fill="white" />

    <path
      d="M24 20C25 15 28 12 32 12C36 12 39 15 40 20"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

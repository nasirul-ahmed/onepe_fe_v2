"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  size = "md",
  href = "/",
  className = "",
  showText = true,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const logoContent = (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo icon */}
      <div
        className={`${sizeClasses[size]} rounded-lg flex items-center justify-center`}
      ></div>

      {/* Logo text */}
      {showText && (
        <span
          className={`font-bold text-gray-900 dark:text-white ${textSizes[size]}`}
        >
          OnePe
        </span>
      )}
    </div>
  );

  return href ? (
    <Link href={href} className="inline-flex">
      {logoContent}
    </Link>
  ) : (
    logoContent
  );
};

export default Logo;

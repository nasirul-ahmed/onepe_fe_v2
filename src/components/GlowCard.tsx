import { cn } from "@/lib/utils";
import React from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;

  glow?: boolean;
  interactive?: boolean;
}

export default function GlowCard({
  children,
  className,
  glow = true,
  interactive = false,
}: GlowCardProps) {
  return (
    <section
      className={cn(
        `
        relative overflow-hidden
        rounded-3xl
        border border-outline-variant
        bg-surface
        shadow-elevation-2
        `,
        interactive &&
          `
          transition-all duration-200
          hover:shadow-elevation-3
          active:scale-[0.99]
        `,
        className,
      )}
    >
      {/* gradient */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-br
          from-primary/10
          via-transparent
          to-tertiary/10
        "
      />

      {glow && (
        <div
          className="
            absolute -top-10 -right-10
            h-32 w-32
            rounded-full
            bg-primary/10
            blur-3xl
          "
        />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

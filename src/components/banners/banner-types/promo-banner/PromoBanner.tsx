import { z } from "zod";
import { cn } from "@/lib/utils";
import { useDeepLink } from "@/hooks/useDeepLink";

export interface PromoBannerProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  ctaText: string;
  action?: string;
}

export const promoBannerSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  imageUrl: z.url().optional(),
  ctaText: z.string(),
  action: z.string().optional(),
});

export default function PromoBanner({
  title,
  subtitle,
  imageUrl,
  ctaText,
  action,
}: PromoBannerProps) {
  const { handleAction } = useDeepLink();
  //border-solid outline outline-[var(--color-on-surface)]
  return (
    <div className="p-4 my-2 rounded-xl shadow-xl shadow-(color-[var(--color-on-background)]) bg-[var(--color-secondary)]">
      <img
        src={imageUrl}
        alt={title}
        className={cn("w-full rounded-md", !imageUrl && "hidden")}
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <h2 className="text-lg font-bold mt-2">{title}</h2>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      <button
        onClick={() => handleAction("deep_link://profile")}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {ctaText}
      </button>
    </div>
  );
}

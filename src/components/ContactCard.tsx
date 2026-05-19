import { EllipsisVertical, LucideIcon, Phone } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ContactCardProps {
  name: string;
  phone: string;
  leadingIcon?: string | LucideIcon;
  onClick?: () => void;
  onOptionClick?: (e: React.MouseEvent<HTMLButtonElement>, phone: string) => void;
}

const ContactCard = ({
  name,
  phone,
  leadingIcon,
  onClick,
  onOptionClick,
}: ContactCardProps) => {
  const buildLeadingIcon = () => {
    if (!leadingIcon) return <Phone size={20} />;

    if (typeof leadingIcon === "string")
      return (
        <Image height={20} width={20} src={leadingIcon} alt="leading icon" />
      );

    const Icon = leadingIcon;
    return <Icon size={20} />;
  };

  return (
    <div
      onClick={onClick}
      className="classicShadow bg-surface-1 rounded-xl p-3 relative border border-border/50"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="p-2 bg-primary/10 rounded-full text-primary">
            {buildLeadingIcon()}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-on-surface">{name}</span>
            <span className="text-sm text-secondary">+91 {phone}</span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={(e) => onOptionClick!(e, phone)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <EllipsisVertical size={20} className="text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

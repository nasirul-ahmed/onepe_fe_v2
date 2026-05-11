"use client";

import { EllipsisVertical, LucideIcon, Phone } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ContactCardProps {
  name: string;
  phone: string;
  leadingIcon: string | LucideIcon;
  onMenuClick?: () => void;
}

const ContactCard = ({ name, phone, leadingIcon }: ContactCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

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
    <div className="classicShadow rounded-xl p-3 relative bg-surface border border-border/50">
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
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <EllipsisVertical size={20} className="text-secondary" />
          </button>

          {/* {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 mt-2 w-48 bg-surface border border-border shadow-xl rounded-xl z-50 py-1"
            >
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted">
                Recharge
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted text-red-500">
                Remove from {"OnePe"} 
              </button>
            </motion.div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

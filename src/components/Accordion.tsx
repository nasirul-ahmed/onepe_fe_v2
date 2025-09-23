"use client";

import React, { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  className = "",
}) => {
  return (
    <div className={`border-b border border-border ${className}`}>
      <button
        className="flex items-center justify-between w-full py-4 text-left font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        onClick={onToggle}
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
};

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  className = "",
}) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            React.cloneElement(child as React.ReactElement<any>, {
              isOpen: openItems.includes(index),
              onToggle: () => handleToggle(index),
            })
          : child
      )}
    </div>
  );
};

export default Accordion;

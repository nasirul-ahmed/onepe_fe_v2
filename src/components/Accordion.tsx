"use client";

import React, { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from '@/styles/components/accordion.module.css';
import { cn } from '@/lib/utils';

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
    <div className={cn(styles.accordionItem, className)}>
      <button
        className={styles.accordionHeader}
        onClick={onToggle}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            styles.accordionIcon,
            isOpen && styles.accordionIconRotated
          )}
        />
      </button>

      <div className={cn(
        styles.accordionContent,
        isOpen ? styles.accordionContentOpen : styles.accordionContentClosed
      )}>
        <div className={styles.accordionContentInner}>{children}</div>
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

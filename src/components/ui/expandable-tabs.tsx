"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";

export type TabItem = {
  title: string;
  icon: React.ComponentType;
};

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  onChange?: (index: number | null) => void;
}

export function ExpandableTabs({
  tabs,
  className,
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (outsideClickRef.current && !outsideClickRef.current.contains(event.target as Node)) {
        setSelected(null);
        onChange?.(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onChange]);

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "relative flex items-center gap-2 rounded-full border p-2",
        className
      )}
    >
      {tabs.map((tab, index) => {
        const isSelected = selected === index;
        const Icon = tab.icon;

        return (
          <button
            key={index}
            className={cn(
              "relative z-10 flex items-center gap-2 rounded-full p-2 text-sm font-medium transition-colors",
              isSelected
                ? "text-foreground"
                : "hover:text-foreground text-muted-foreground"
            )}
            onClick={() => {
              setSelected(isSelected ? null : index);
              onChange?.(isSelected ? null : index);
            }}
          >
            <Icon />
            <span
              className={cn(
                "pointer-events-none inline-block select-none transition-opacity duration-200",
                isSelected ? "opacity-100" : "opacity-0"
              )}
            >
              {tab.title}
            </span>
            {isSelected && (
              <motion.div
                layoutId="expandable-tab"
                className="absolute inset-0 z-[-1] rounded-full bg-muted"
                transition={{
                  type: "spring",
                  bounce: 0.15,
                  duration: 0.5,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
} 
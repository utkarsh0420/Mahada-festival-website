"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
  id?: string;
  activeColor?: string;
  iconColor?: string;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  id?: string;
}

export type TabItem = Tab | Separator;

export interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-gold-200",
  onChange,
}: ExpandableTabsProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex items-center gap-1 sm:gap-1.5 rounded-full border border-gold-500/40 bg-maroon-950/95 p-1 shadow-xl backdrop-blur-md",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return (
            <div
              key={`separator-${index}`}
              className="mx-1 h-[22px] w-[1px] bg-gold-500/40"
              aria-hidden="true"
            />
          );
        }

        const Icon = tab.icon;
        const isHovered = hovered === index;
        const isActive = tab.isActive;

        return (
          <button
            key={tab.id || tab.title || index}
            type="button"
            onMouseEnter={() => setHovered(index)}
            onClick={() => {
              if (tab.onClick) {
                tab.onClick();
              }
              onChange?.(index);
            }}
            className={cn(
              "relative flex items-center rounded-full px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer outline-none select-none",
              isHovered
                ? "bg-gradient-to-r from-amber-900/90 to-maroon-800 text-gold-200 shadow-md border border-gold-400/60"
                : isActive
                ? "bg-maroon-900/80 text-gold-200 border border-gold-500/30"
                : "text-gold-300/80 hover:bg-maroon-900/60 hover:text-gold-100 border border-transparent",
              tab.className
            )}
            title={tab.title}
            aria-label={tab.title}
          >
            <Icon
              size={18}
              className={cn("flex-shrink-0 transition-colors", tab.iconColor || "text-gold-300")}
            />
            <AnimatePresence initial={false}>
              {isHovered && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "inline-block" }}
                  className="overflow-hidden whitespace-nowrap font-bold text-xs sm:text-sm pl-1.5 text-gold-200 tracking-wide"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
            {isActive && !isHovered && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-400 shadow-[0_0_4px_rgba(250,204,21,0.8)]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
export default ExpandableTabs;

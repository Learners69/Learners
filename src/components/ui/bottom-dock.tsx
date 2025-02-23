"use client";

import { ExpandableTabs } from "./expandable-tabs";
import { Home, User, Briefcase, FileText } from 'lucide-react';

const tabs = [
  {
    title: "Home",
    icon: Home,
  },
  {
    title: "About",
    icon: User,
  },
  {
    title: "Projects",
    icon: Briefcase,
  },
  {
    title: "Contact",
    icon: FileText,
  },
];

export function BottomDock() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4" suppressHydrationWarning>
      <ExpandableTabs
        tabs={tabs}
        className="bg-background/90 backdrop-blur-lg border-border/40"
      />
    </div>
  );
} 
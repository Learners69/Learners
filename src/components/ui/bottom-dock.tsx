"use client";

import { Home, Bell, Settings, HelpCircle, Shield } from "lucide-react";
import { ExpandableTabs } from "./expandable-tabs";

export function BottomDock() {
  const tabs = [
    { title: "Home", icon: Home },
    { title: "Notifications", icon: Bell },
    { type: "separator" },
    { title: "Settings", icon: Settings },
    { title: "Help", icon: HelpCircle },
    { title: "Security", icon: Shield },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4" suppressHydrationWarning>
      <ExpandableTabs 
        tabs={tabs} 
        className="bg-background/90 backdrop-blur-lg border-border/40" 
      />
    </div>
  );
} 
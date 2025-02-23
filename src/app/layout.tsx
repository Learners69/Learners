import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CombinedNav } from "@/components/ui/combined-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learners - Your Learning Journey Starts Here",
  description: "Join Learners to discover courses, connect with mentors, and unlock your potential through expert-led education.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className={`${inter.className} bg-background text-foreground antialiased`}>
        <CombinedNav />
        <main className="min-h-screen pt-16 pb-24">
          {children}
        </main>
      </body>
    </html>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={toggle}
    className="p-1"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
    </svg>
  </Button>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8" suppressHydrationWarning>
          <div className="flex items-center justify-between h-14 md:h-16" suppressHydrationWarning>
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-base md:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                Learners
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4" suppressHydrationWarning>
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm">
                  Get Started
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden" suppressHydrationWarning>
              <MenuToggle isOpen={isOpen} toggle={toggleMenu} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            suppressHydrationWarning
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <motion.div 
        className="fixed top-0 right-0 h-full w-64 bg-background border-l z-50 md:hidden"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        suppressHydrationWarning
      >
        <div className="flex flex-col h-full" suppressHydrationWarning>
          <div className="flex justify-end p-4" suppressHydrationWarning>
            <MenuToggle isOpen={isOpen} toggle={toggleMenu} />
          </div>
          <motion.div 
            className="px-2 py-2 space-y-1"
            initial="closed"
            animate="open"
            variants={{
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 }
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
              }
            }}
            suppressHydrationWarning
          >
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                variants={{
                  open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      y: { stiffness: 1000, velocity: -100 }
                    }
                  },
                  closed: {
                    y: 50,
                    opacity: 0,
                    transition: {
                      y: { stiffness: 1000 }
                    }
                  }
                }}
                suppressHydrationWarning
              >
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div 
              className="flex flex-col space-y-2 px-3 pt-4"
              variants={{
                open: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    y: { stiffness: 1000, velocity: -100 }
                  }
                },
                closed: {
                  y: 50,
                  opacity: 0,
                  transition: {
                    y: { stiffness: 1000 }
                  }
                }
              }}
              suppressHydrationWarning
            >
              <Button variant="outline" size="sm" className="w-full justify-center">
                Sign In
              </Button>
              <Button size="sm" className="w-full justify-center">
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
} 
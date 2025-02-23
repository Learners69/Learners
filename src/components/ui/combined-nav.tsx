"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./button"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "./tubelight-navbar"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const tubelightItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/about', icon: User },
  { name: 'Projects', url: '/projects', icon: Briefcase },
  { name: 'Contact', url: '/contact', icon: FileText }
]

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
)

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
)

export function CombinedNav() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-40">
        <NavBar items={tubelightItems} className="w-fit mx-auto" />
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="px-3">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-base font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                Learners
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <MenuToggle isOpen={isOpen} toggle={toggleMenu} />
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
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <motion.div 
        className="fixed top-0 right-0 h-full w-64 bg-background border-l z-50 md:hidden"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
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
  )
} 
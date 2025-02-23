"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { StarBorder } from "@/components/ui/star-border";
import { renderCanvas, onMousemove, resizeCanvas } from "@/components/ui/canvas";

export function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Expert Instructors", "Flexible Learning", "Community Support", "Personal Growth", "Success"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  useEffect(() => {
    renderCanvas();
    return () => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // @ts-ignore
          ctx.running = false;
        }
      }
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      window.removeEventListener('resize', resizeCanvas);
      document.body.removeEventListener('orientationchange', resizeCanvas);
    };
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-6rem)] flex items-center">
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
      ></canvas>
      <div className="container mx-auto">
        <div className="flex gap-12 sm:gap-16 py-12 sm:py-20 lg:py-32 items-center justify-center flex-col">
          {/* Top Button Section */}
          <div>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 group relative overflow-hidden rounded-full hover:border-foreground/50 transition-colors text-sm sm:text-base"
            >
              <span>Start Learning Today</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-x-0 h-[1.5px] bottom-0 bg-gradient-to-r from-foreground/0 via-foreground/50 to-foreground/0 group-hover:opacity-100 opacity-0 transition-opacity" />
            </Button>
          </div>
          
          {/* Hero Title Section */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular px-4">
              <span className="text-foreground">Welcome to</span>
              <div className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 min-h-[1.5em] sm:min-h-[1.2em]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={titles[titleNumber]}
                    className="font-semibold bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-500 dark:to-purple-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {titles[titleNumber]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center px-4">
              Your journey to knowledge starts here. Discover courses, connect with mentors, 
              and unlock your potential.
            </p>
          </div>
          
          {/* CTA Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
            <StarBorder as="div" className="w-full sm:w-fit" color="hsl(var(--primary))" speed="4s">
              <Button 
                size="lg" 
                className="rounded-full w-full sm:w-auto px-8 py-6 bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-500 dark:to-purple-500 hover:opacity-90 transition-opacity border-0 text-lg"
              >
                Get Started
              </Button>
            </StarBorder>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full w-full sm:w-auto px-8 py-6 gap-2 group hover:border-foreground/50 transition-colors text-lg"
            >
              Browse Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
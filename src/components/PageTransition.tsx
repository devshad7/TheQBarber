"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

import type { Transition } from "framer-motion";

const transition: Transition = {
  type: "tween",
  ease: [0.4, 0, 0.2, 1],
  duration: 0.25,
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // Simple direction logic based on route depth
  const getDirection = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    return segments.length;
  };

  const direction = getDirection(pathname);

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

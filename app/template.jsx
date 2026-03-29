"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="page-transition-shell"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

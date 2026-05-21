"use client";

import { motion } from "framer-motion";
import { PlugZap } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        {/* Illustration */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Laptop */}
          <div className="relative h-36 w-56 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
            <div className="absolute inset-3 rounded-xl bg-slate-950 flex items-center justify-center">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-3 w-3 rounded-full bg-blue-500"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Base */}
            <div className="absolute left-1/2 top-full h-3 w-64 -translate-x-1/2 rounded-b-2xl bg-slate-800" />
          </div>

          {/* Mobile */}
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute -right-12 top-10 h-24 w-14 rounded-xl border border-slate-700 bg-slate-900 p-1 shadow-xl"
          >
            <div className="h-full w-full rounded-lg bg-blue-500/80" />
          </motion.div>

          {/* Plug */}
          <motion.div
            animate={{
              rotate: [-8, 8, -8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute -bottom-12 left-12"
          >
            <PlugZap size={40} className="text-blue-500" />
          </motion.div>

          {/* Cable */}
          <svg
            className="absolute -bottom-4 left-20"
            width="140"
            height="70"
            viewBox="0 0 140 70"
            fill="none"
          >
            <path
              d="M5 10 C40 60, 100 0, 135 50"
              stroke="#3B82F6"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Coming Soon
        </h2>

        <p className="mt-3 max-w-md text-sm text-slate-400">
          {"We\’re currently building this feature. Something clean, fast and powerful is on the way."}
        </p>

        {/* Status pill */}
        <div className="mt-6 flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          <motion.div
            className="h-2 w-2 rounded-full bg-blue-400"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
          />
          Work in progress
        </div>
      </div>
    </div>
  );
}

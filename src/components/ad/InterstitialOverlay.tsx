"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useAdStore } from "@/stores/adStore";
import AdSlot from "./AdSlot";

export default function InterstitialOverlay() {
  const isVisible = useAdStore((s) => s.isVisible);
  const countdown = useAdStore((s) => s.countdown);
  const canClose = useAdStore((s) => s.canClose);
  const tick = useAdStore((s) => s.tick);
  const hide = useAdStore((s) => s.hide);

  // Countdown timer
  useEffect(() => {
    if (!isVisible || canClose) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isVisible, canClose, tick]);

  // Prevent body scroll while overlay is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                スポンサー
              </span>
              {canClose ? (
                <button
                  onClick={hide}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  aria-label="閉じる"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
                  {countdown}秒後に閉じられます
                </span>
              )}
            </div>

            {/* Ad content */}
            <div className="p-4">
              <AdSlot />
            </div>

            {/* Close button */}
            {canClose && (
              <div className="px-4 pb-4">
                <button
                  onClick={hide}
                  className="w-full py-2.5 text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  閉じてリサイズ結果を表示
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

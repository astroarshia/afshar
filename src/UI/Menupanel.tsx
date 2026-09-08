"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MenuPanel
 * -----------------------------------------------------------------------
 * پنل کشویی منو که با کلیک روی آیکون همبرگری در Header باز می‌شه.
 * فایلش عمداً جداست تا محتوای واقعی منو (دسته‌بندی‌ها، لینک‌ها و ...)
 * بعداً همین‌جا اضافه بشه — بخش مشخص‌شده با کامنت "TODO" پایین‌تره.
 */
export default function MenuPanel({ isOpen, onClose }: MenuPanelProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* پس‌زمینه‌ی تیره */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* پنل شیشه‌ای */}
          <motion.aside
            dir="rtl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col border-l border-white/10 bg-[#0a0a18]/90 shadow-[0_0_60px_-10px_rgba(124,58,237,0.5)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <span className="bg-gradient-to-l from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-base font-bold text-transparent">
                منو
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="بستن منو"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              {/*
                TODO: محتوای واقعی منو اینجا اضافه می‌شود
                (دسته‌بندی محصولات، لینک‌ها، تنظیمات و غیره)
              */}
              <p className="text-sm text-white/40">
                محتوای منو بعداً اینجا اضافه می‌شود.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
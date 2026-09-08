"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, Menu } from "lucide-react";

import MenuPanel from "./Menupanel";
import CartDrawer from "./Store/CartDrawer";
import { useCart } from "./Store/CartContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartHover, setIsCartHover] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;

    const t = setTimeout(
      () => searchInputRef.current?.focus(),
      180
    );

    return () => clearTimeout(t);
  }, [isSearchOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsCartOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        dir="ltr"
        initial={false}
        animate={{
          paddingTop: isScrolled ? 10 : 20,
          paddingBottom: isScrolled ? 10 : 20,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={[
          "fixed inset-x-0 top-0 z-50 px-5 sm:px-8",
          "border-b transition-colors duration-500",
          isScrolled
            ? "bg-[#0a0a18]/70 border-white/10 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(124,58,237,0.35)]"
            : "bg-[#0a0a18]/30 border-white/5 backdrop-blur-md",
        ].join(" ")}
      >
        <LayoutGroup>
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            {/* Left group */}
            <div className="flex items-center gap-1.5">
              {/* Search */}
              <motion.button
                layout
                type="button"
                onClick={() => setIsSearchOpen((v) => !v)}
                aria-label="جستجو"
                aria-expanded={isSearchOpen}
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
              >
                <span
                  className={[
                    "absolute inset-0 rounded-full transition-all duration-300",
                    isSearchOpen
                      ? "bg-gradient-to-br from-violet-500/30 to-cyan-400/20 ring-1 ring-violet-400/40"
                      : "bg-white/0 hover:bg-white/10",
                  ].join(" ")}
                />

                <Search size={18} className="relative" />
              </motion.button>

              {/* Search input */}
              <AnimatePresence initial={false}>
                {isSearchOpen && (
                  <motion.form
                    onSubmit={(e) => e.preventDefault()}
                    initial={{
                      width: 0,
                      opacity: 0,
                    }}
                    animate={{
                      width: 240,
                      opacity: 1,
                    }}
                    exit={{
                      width: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="جستجوی محصول، برند، مدل..."
                      dir="rtl"
                      className="h-10 w-[240px] rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-white/40 outline-none ring-violet-400/40 backdrop-blur-md focus:ring-2"
                    />
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Cart */}
              <motion.div layout className="relative">
                <button
                  type="button"
                  aria-label="سبد خرید"
                  onClick={() => setIsCartOpen(true)}
                  onMouseEnter={() => setIsCartHover(true)}
                  onMouseLeave={() => setIsCartHover(false)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <ShoppingCart size={18} />

                  {/* Cart badge */}
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{
                        scale: 0,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-violet-500 px-1 text-[9px] font-bold text-white ring-2 ring-[#0a0a18]"
                    >
                      {totalItems > 99 ? "99+" : totalItems}
                    </motion.span>
                  )}
                </button>

                {/* Small hover preview */}
                <AnimatePresence>
                  {isCartHover && !isCartOpen && (
                    <motion.div
                      dir="rtl"
                      initial={{
                        opacity: 0,
                        y: 6,
                        scale: 0.97,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 6,
                        scale: 0.97,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                      onMouseEnter={() => setIsCartHover(true)}
                      onMouseLeave={() => setIsCartHover(false)}
                      className="absolute left-0 top-full w-72 pt-3"
                    >
                      <div className="rounded-2xl border border-white/10 bg-[#0d0c22]/90 p-4 shadow-[0_20px_60px_-15px_rgba(124,58,237,0.5)] backdrop-blur-2xl">
                        <p className="mb-1 text-sm font-medium text-white">
                          سبد خرید
                        </p>

                        <div className="flex flex-col items-center gap-2 py-5 text-center">
                          <ShoppingCart
                            size={26}
                            className={
                              totalItems > 0
                                ? "text-violet-300"
                                : "text-white/25"
                            }
                          />

                          {totalItems > 0 ? (
                            <>
                              <p className="text-xs text-white/70">
                                {totalItems} محصول در سبد خرید
                              </p>

                              <p className="text-[11px] text-white/35">
                                برای مشاهده سبد خرید کلیک کنید
                              </p>
                            </>
                          ) : (
                            <p className="text-xs text-white/50">
                              سبد خرید شما در حال حاضر خالی است
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Profile */}
              <motion.div layout>
                <Link
                  href="/profile"
                  aria-label="پروفایل"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <User size={18} />
                </Link>
              </motion.div>
            </div>

            {/* Right group */}
            <div className="flex items-center gap-4">
              <span
                className="select-none bg-gradient-to-l from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-lg font-bold tracking-wide text-transparent"
                style={{
                  fontFamily:
                    "var(--font-logo, 'Vazirmatn', sans-serif)",
                }}
                dir="rtl"
              >
                افشار سیستم
              </span>

              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="باز کردن منو"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </LayoutGroup>

        {/* RGB line */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <div className="h-full w-[300%] rgb-line" />
        </div>
      </motion.header>

      {/* Menu */}
      <MenuPanel
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <style>{`
        .rgb-line {
          background: linear-gradient(
            90deg,
            transparent,
            #7c3aed,
            #22d3ee,
            #ec4899,
            transparent
          );
          animation: slideLine 6s linear infinite;
          opacity: 0.5;
        }

        @keyframes slideLine {
          0% {
            transform: translateX(-66.66%);
          }

          100% {
            transform: translateX(0%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rgb-line {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

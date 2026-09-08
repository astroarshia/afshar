"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";

import { useCart } from "./CartContext";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({
  isOpen,
  onClose,
}: CartDrawerProps) {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.button
            type="button"
            aria-label="بستن سبد خرید"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] cursor-default bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            dir="rtl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 260,
            }}
            className="fixed right-0 top-0 z-[100] flex h-screen w-full max-w-md flex-col border-l border-white/10 bg-[#08080c]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <ShoppingCart
                    size={20}
                    className="text-violet-300"
                  />

                  <h2 className="text-lg font-semibold text-white">
                    سبد خرید
                  </h2>
                </div>

                <p className="mt-1 text-xs text-white/40">
                  {totalItems} محصول
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="بستن"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Products */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <ShoppingCart
                      size={26}
                      className="text-white/30"
                    />
                  </div>

                  <h3 className="mt-5 text-base font-medium text-white">
                    سبد خرید خالی است
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/35">
                    هنوز محصولی به سبد خرید اضافه نکرده‌اید.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-3"
                    >
                      <div className="flex gap-3">
                        {/* Image */}
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.04]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-16 max-w-full object-contain"
                          />
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] text-white/35">
                            {item.brand}
                          </p>

                          <h3 className="mt-1 truncate text-sm font-medium text-white">
                            {item.name}
                          </h3>

                          <p className="mt-2 text-sm font-semibold text-violet-200">
                            {item.price.toLocaleString("fa-IR")}{" "}
                            <span className="text-[10px] font-normal text-white/35">
                              تومان
                            </span>
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`حذف ${item.name}`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/30 transition hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* Quantity */}
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-white/35">
                          تعداد
                        </span>

                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-1">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            aria-label="کاهش تعداد"
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="min-w-6 text-center text-sm font-medium text-white">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            aria-label="افزایش تعداد"
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Item total */}
                      <div className="mt-3 border-t border-white/5 pt-3 text-left">
                        <span className="text-xs text-white/35">
                          مجموع:
                        </span>

                        <span className="mr-2 text-sm font-medium text-white/80">
                          {(item.price * item.quantity).toLocaleString(
                            "fa-IR"
                          )}{" "}
                          تومان
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 bg-black/20 px-5 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/45">
                    مجموع سبد خرید
                  </span>

                  <div className="text-left">
                    <span className="text-xl font-bold text-white">
                      {totalPrice.toLocaleString("fa-IR")}
                    </span>

                    <span className="mr-1 text-xs text-white/40">
                      تومان
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 w-full rounded-xl bg-violet-500/20 px-5 py-3.5 text-sm font-medium text-violet-100 transition hover:bg-violet-500/30"
                >
                  ادامه فرآیند خرید
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

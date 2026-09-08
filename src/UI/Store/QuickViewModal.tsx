"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  ShoppingCart,
  PackageCheck,
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
} from "lucide-react";

import { Laptop } from "./LaptopCard";

type QuickViewModalProps = {
  laptop: Laptop | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function QuickViewModal({
  laptop,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  if (!laptop) return null;

  const discount =
    laptop.oldPrice && laptop.oldPrice > laptop.price
      ? Math.round(
          ((laptop.oldPrice - laptop.price) / laptop.oldPrice) * 100
        )
      : 0;

  const isInStock = laptop.stock === undefined || laptop.stock > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          dir="rtl"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="
              absolute inset-0
              bg-black/70
              backdrop-blur-md
            "
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 20,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="
              relative z-10
              w-full max-w-4xl
              overflow-hidden
              rounded-3xl
              border border-white/10
              bg-[#0b0b12]/95
              shadow-2xl
              backdrop-blur-2xl
            "
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="بستن"
              className="
                absolute left-5 top-5 z-20
                flex h-10 w-10
                items-center justify-center
                rounded-full
                border border-white/10
                bg-white/5
                text-white/60
                backdrop-blur-md
                transition-all
                hover:border-white/20
                hover:bg-white/10
                hover:text-white
              "
            >
              <X size={19} />
            </button>

            <div className="grid md:grid-cols-2">

              {/* Product Image */}
              <div
                className="
                  relative flex min-h-[360px]
                  items-center justify-center
                  overflow-hidden
                  bg-white/[0.02]
                  p-10
                "
              >
                <div
                  className="
                    absolute
                    h-72 w-72
                    rounded-full
                    bg-violet-500/10
                    blur-3xl
                  "
                />

                <img
                  src={laptop.image}
                  alt={laptop.name}
                  className="
                    relative z-10
                    max-h-[300px]
                    max-w-full
                    object-contain
                    drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]
                  "
                />

                {laptop.badge && (
                  <span
                    className="
                      absolute right-6 top-6
                      rounded-full
                      border border-cyan-400/20
                      bg-cyan-400/10
                      px-3 py-1.5
                      text-xs
                      font-medium
                      text-cyan-300
                    "
                  >
                    {laptop.badge}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-7 sm:p-9">

                {/* Brand */}
                <div className="text-xs text-white/40">
                  {laptop.brand}
                </div>

                {/* Name */}
                <h2
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    text-white
                    sm:text-3xl
                  "
                >
                  {laptop.name}
                </h2>

                {/* Stock */}
                <div className="mt-4 flex items-center gap-2">
                  <PackageCheck
                    size={15}
                    className={
                      isInStock
                        ? "text-emerald-400"
                        : "text-red-400"
                    }
                  />

                  <span
                    className={
                      isInStock
                        ? "text-sm text-emerald-400/80"
                        : "text-sm text-red-400/80"
                    }
                  >
                    {isInStock
                      ? "موجود در انبار"
                      : "ناموجود"}
                  </span>
                </div>

                {/* Specs */}
                <div
                  className="
                    mt-7
                    grid grid-cols-2
                    gap-3
                  "
                >
                  <Spec
                    icon={<Cpu size={17} />}
                    label="پردازنده"
                    value={laptop.cpu}
                  />

                  <Spec
                    icon={<Monitor size={17} />}
                    label="گرافیک"
                    value={laptop.gpu}
                  />

                  <Spec
                    icon={<MemoryStick size={17} />}
                    label="رم"
                    value={laptop.ram}
                  />

                  <Spec
                    icon={<HardDrive size={17} />}
                    label="حافظه"
                    value={laptop.storage}
                  />
                </div>

                {/* Price */}
                <div
                  className="
                    mt-7
                    border-t border-white/10
                    pt-6
                  "
                >
                  {laptop.oldPrice && (
                    <div
                      className="
                        flex items-center gap-3
                        text-sm
                        text-white/30
                        line-through
                      "
                    >
                      {laptop.oldPrice.toLocaleString("fa-IR")}
                      <span>تومان</span>
                    </div>
                  )}

                  <div
                    className="
                      mt-1
                      flex items-center gap-2
                    "
                  >
                    <span
                      className="
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      {laptop.price.toLocaleString("fa-IR")}
                    </span>

                    <span
                      className="
                        text-xs
                        text-white/40
                      "
                    >
                      تومان
                    </span>

                    {discount > 0 && (
                      <span
                        className="
                          mr-2
                          rounded-full
                          bg-pink-400/10
                          px-2.5 py-1
                          text-xs
                          font-bold
                          text-pink-300
                        "
                      >
                        {discount}٪ تخفیف
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div
                  className="
                    mt-7
                    flex gap-3
                  "
                >
                  <button
                    type="button"
                    disabled={!isInStock}
                    className="
                      flex flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-violet-500/20
                      px-5 py-3
                      text-sm
                      font-medium
                      text-white
                      transition-all
                      hover:bg-violet-500/30
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <ShoppingCart size={17} />
                    افزودن به سبد
                  </button>

                  <button
                    type="button"
                    aria-label="افزودن به علاقه‌مندی‌ها"
                    className="
                      flex h-12 w-12
                      items-center
                      justify-center
                      rounded-xl
                      border border-white/10
                      bg-white/5
                      text-white/60
                      transition-all
                      hover:border-pink-400/30
                      hover:bg-pink-400/10
                      hover:text-pink-300
                    "
                  >
                    <Heart size={18} />
                  </button>
                </div>

                {/* Product Page */}
                <button
                  type="button"
                  className="
                    mt-3
                    w-full
                    rounded-xl
                    border border-white/10
                    bg-white/[0.03]
                    px-5 py-3
                    text-sm
                    text-white/50
                    transition-all
                    hover:border-cyan-400/20
                    hover:bg-cyan-400/5
                    hover:text-cyan-300
                  "
                >
                  مشاهده صفحه محصول
                </button>
              </div>
            </div>

            {/* Bottom Glow */}
            <div
              className="
                absolute
                bottom-0
                left-1/2
                h-px
                w-2/3
                -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                via-cyan-400
                to-transparent
              "
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border border-white/5
        bg-white/[0.03]
        p-3
      "
    >
      <div
        className="
          flex items-center
          gap-2
          text-white/30
        "
      >
        {icon}

        <span className="text-[10px]">
          {label}
        </span>
      </div>

      <div
        className="
          mt-2
          text-xs
          font-medium
          text-white/80
        "
      >
        {value}
      </div>
    </div>
  );
}
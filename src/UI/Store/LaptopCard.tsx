"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  PackageCheck,
  Eye,
} from "lucide-react";

import QuickViewModal from "./QuickViewModal";
import { useCart } from "./CartContext";

export type Laptop = {
  id: number;
  brand: string;
  name: string;
  image: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  stock?: number;
};

type LaptopCardProps = {
  laptop: Laptop;
};

export default function LaptopCard({ laptop }: LaptopCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { addToCart, items } = useCart();

  const cartItem = items.find((item) => item.id === laptop.id);

  const isAdded = !!cartItem;

  const discount = laptop.oldPrice
    ? Math.round(
        ((laptop.oldPrice - laptop.price) / laptop.oldPrice) * 100
      )
    : 0;

  const isOutOfStock = laptop.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addToCart(laptop);
  };

  return (
    <>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        dir="rtl"
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl"
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badge */}
        {laptop.badge && (
          <div className="absolute right-4 top-4 z-10 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-200 backdrop-blur-md">
            {laptop.badge}
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setIsLiked((value) => !value)}
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/60 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
        >
          <Heart
            size={17}
            className={isLiked ? "fill-current text-pink-400" : ""}
          />
        </button>

        {/* Image */}
        <div className="relative flex h-52 items-center justify-center overflow-hidden px-6 pt-8">
          <img
            src={laptop.image}
            alt={laptop.name}
            className="max-h-44 w-full object-contain transition duration-500 group-hover:scale-105"
          />

          {/* Quick View */}
          <button
            type="button"
            onClick={() => setIsQuickViewOpen(true)}
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-3 items-center gap-2 rounded-xl border border-white/10 bg-black/60 px-4 py-2 text-xs text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white/10"
          >
            <Eye size={15} />
            مشاهده سریع
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pb-5">
          <p className="text-xs text-white/40">{laptop.brand}</p>

          <h3 className="mt-1 truncate text-lg font-semibold text-white">
            {laptop.name}
          </h3>

          {/* Specs */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/[0.035] px-3 py-2">
              <p className="text-[10px] text-white/35">پردازنده</p>
              <p className="mt-1 truncate text-xs text-white/75">
                {laptop.cpu}
              </p>
            </div>

            <div className="rounded-xl bg-white/[0.035] px-3 py-2">
              <p className="text-[10px] text-white/35">گرافیک</p>
              <p className="mt-1 truncate text-xs text-white/75">
                {laptop.gpu}
              </p>
            </div>

            <div className="rounded-xl bg-white/[0.035] px-3 py-2">
              <p className="text-[10px] text-white/35">رم</p>
              <p className="mt-1 text-xs text-white/75">{laptop.ram}</p>
            </div>

            <div className="rounded-xl bg-white/[0.035] px-3 py-2">
              <p className="text-[10px] text-white/35">حافظه</p>
              <p className="mt-1 truncate text-xs text-white/75">
                {laptop.storage}
              </p>
            </div>
          </div>

          {/* Stock */}
          <div className="mt-4 flex items-center gap-2 text-xs">
            <PackageCheck
              size={14}
              className={
                isOutOfStock ? "text-red-400" : "text-emerald-400"
              }
            />

            <span
              className={
                isOutOfStock ? "text-red-300" : "text-white/50"
              }
            >
              {isOutOfStock
                ? "ناموجود"
                : laptop.stock
                  ? `${laptop.stock} عدد موجود`
                  : "موجود در انبار"}
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-end justify-between gap-3">
            <div>
              {laptop.oldPrice && (
                <div className="text-xs text-white/30 line-through">
                  {laptop.oldPrice.toLocaleString("fa-IR")}
                </div>
              )}

              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-bold text-white">
                  {laptop.price.toLocaleString("fa-IR")}
                </span>

                <span className="text-[10px] text-white/40">
                  تومان
                </span>
              </div>
            </div>

            {discount > 0 && (
              <span className="rounded-lg bg-pink-500/10 px-2 py-1 text-xs text-pink-300">
                {discount}٪ تخفیف
              </span>
            )}
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isOutOfStock
                ? "cursor-not-allowed bg-white/5 text-white/20"
                : isAdded
                  ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/20"
                  : "bg-violet-500/15 text-violet-200 hover:bg-violet-500/25"
            }`}
          >
            <ShoppingCart size={17} />

            {isOutOfStock
              ? "ناموجود"
              : isAdded
                ? `در سبد خرید (${cartItem?.quantity})`
                : "افزودن به سبد خرید"}
          </button>
        </div>
      </motion.article>

      <QuickViewModal
        laptop={laptop}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
} 
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useCart } from "@/src/UI/Store/CartContext";

export default function CartPage() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#050507] px-5 pb-20 pt-32 text-white sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <ArrowRight size={16} />
            بازگشت به فروشگاه
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
              <ShoppingCart
                size={21}
                className="text-violet-300"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                سبد خرید
              </h1>

              <p className="mt-1 text-sm text-white/35">
                {totalItems} کالا در سبد خرید
              </p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.025] px-5 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04]">
              <ShoppingCart
                size={32}
                className="text-white/25"
              />
            </div>

            <h2 className="mt-6 text-xl font-semibold">
              سبد خرید شما خالی است
            </h2>

            <p className="mt-2 max-w-md text-sm leading-7 text-white/35">
              هنوز محصولی به سبد خرید اضافه نکرده‌اید.
            </p>

            <Link
              href="/"
              className="mt-7 rounded-xl bg-violet-500/15 px-6 py-3 text-sm font-medium text-violet-200 transition hover:bg-violet-500/25"
            >
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* Products */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl sm:p-5"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-white/[0.035] sm:h-36 sm:w-36">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain p-2"
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-white/35">
                        {item.brand}
                      </p>

                      <h2 className="mt-1 text-base font-semibold text-white sm:text-lg">
                        {item.name}
                      </h2>

                      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-white/40 sm:flex sm:gap-5">
                        <span>{item.cpu}</span>
                        <span>{item.gpu}</span>
                        <span>{item.ram}</span>
                        <span>{item.storage}</span>
                      </div>

                      <p className="mt-4 text-base font-bold text-violet-200">
                        {item.price.toLocaleString("fa-IR")}
                        <span className="mr-1 text-xs font-normal text-white/35">
                          تومان
                        </span>
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`حذف ${item.name}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white/30 transition hover:bg-red-500/10 hover:text-red-300"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  {/* Bottom */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-xs text-white/35">
                      تعداد
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-1">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          aria-label="کاهش تعداد"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="min-w-7 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          aria-label="افزایش تعداد"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="hidden text-left sm:block">
                      <span className="text-xs text-white/35">
                        مجموع
                      </span>

                      <p className="mt-1 text-sm font-semibold text-white">
                        {(
                          item.price * item.quantity
                        ).toLocaleString("fa-IR")}{" "}
                        <span className="text-[10px] font-normal text-white/35">
                          تومان
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold">
                خلاصه سفارش
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">
                    تعداد کالا
                  </span>

                  <span className="text-white/80">
                    {totalItems}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/40">
                    هزینه ارسال
                  </span>

                  <span className="text-emerald-300">
                    محاسبه در مرحله بعد
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-end justify-between">
                    <span className="text-white/40">
                      مبلغ کل
                    </span>

                    <div className="text-left">
                      <span className="text-2xl font-bold text-white">
                        {totalPrice.toLocaleString("fa-IR")}
                      </span>

                      <span className="mr-1 text-xs text-white/40">
                        تومان
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-xl bg-violet-500/20 px-5 py-4 text-sm font-medium text-violet-100 transition hover:bg-violet-500/30"
              >
                ادامه فرآیند خرید
              </button>

              <Link
                href="/"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
              >
                ادامه خرید
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { ArrowLeft } from "lucide-react";
import LaptopCard, { Laptop } from "./LaptopCard";
import { laptops } from "@/src/UI/data/laptops";


export default function FeaturedLaptops() {
  return (
    <section
      dir="rtl"
      className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8"
    >
      {/* Header */}
      <div className="mb-10 flex items-end justify-between">

        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

            <span className="text-xs font-medium tracking-wider text-cyan-300/70">
              STORE / LAPTOPS
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white">
            لپ‌تاپ‌های منتخب
          </h2>

          <p className="mt-2 text-sm text-white/40">
            بهترین انتخاب‌ها از میان محصولات فروشگاه
          </p>
        </div>

        <button
          type="button"
          className="
            hidden items-center gap-2
            text-sm text-white/50
            transition-colors
            hover:text-cyan-300
            sm:flex
          "
        >
          مشاهده همه
          <ArrowLeft size={16} />
        </button>
      </div>

      {/* Products */}
      <div className="
        grid grid-cols-1 gap-5
        sm:grid-cols-2
        lg:grid-cols-4
      ">
        {laptops.map((laptop) => (
          <LaptopCard
            key={laptop.id}
            laptop={laptop}
          />
        ))}
      </div>
    </section>
  );
}
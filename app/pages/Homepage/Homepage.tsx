"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Headphones, HardDrive, Laptop, Monitor, Printer, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import Background from "@/src/UI/Background";
import Header from "@/src/UI/Header";
import FeaturedLaptops from "@/src/UI/Store/FeaturedLaptops";
import Footer from "@/src/UI/Footer";

const categories = [
  { title: "لپ‌تاپ", subtitle: "استوک و حرفه‌ای", icon: Laptop, href: "/products", accent: "violet" },
  { title: "مینی کیس", subtitle: "جمع‌وجور و قدرتمند", icon: Monitor, href: "/products", accent: "cyan" },
  { title: "ذخیره‌سازی", subtitle: "SSD و هارد", icon: HardDrive, href: "/products", accent: "pink" },
  { title: "پرینتر", subtitle: "پرینتر و لیبل‌زن", icon: Printer, href: "/products", accent: "violet" },
  { title: "لوازم جانبی", subtitle: "برای ستاپ کامل", icon: Headphones, href: "/products", accent: "cyan" },
  { title: "کیف و کوله", subtitle: "محافظ و کاربردی", icon: ShoppingBag, href: "/products", accent: "pink" },
];

const highlights = [
  { icon: ShieldCheck, title: "خرید مطمئن", text: "تضمین اصالت و سلامت کالا" },
  { icon: Truck, title: "ارسال سریع", text: "ارسال به سراسر کشور" },
  { icon: Headphones, title: "پشتیبانی تخصصی", text: "قبل و بعد از خرید کنار شما هستیم" },
];

export default function Homepage() {
  return (
    <>
      <Background />
      <Header />
      <main className="relative overflow-hidden pt-20" dir="rtl">
        <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative z-10 text-right">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-4 py-2 text-xs text-cyan-200/80 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.9)]" />
                انتخاب هوشمند برای حرفه‌ای‌ها
              </div>
              <h1 className="max-w-3xl text-4xl font-black leading-[1.18] tracking-tight text-white sm:text-5xl lg:text-6xl">
                تکنولوژی مناسب تو،
                <span className="mt-2 block bg-gradient-to-l from-violet-300 via-cyan-200 to-white bg-clip-text text-transparent">دقیقاً همین‌جاست.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/50 sm:text-lg">از لپ‌تاپ و مینی‌کیس تا تجهیزات جانبی؛ انتخابی مطمئن برای کار، گیم، طراحی و استفاده روزمره.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="#featured" className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-cyan-100">مشاهده محصولات <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" /></Link>
                <Link href="/products" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/75 backdrop-blur-md transition hover:border-violet-300/30 hover:bg-white/[0.08] hover:text-white">همه محصولات <ArrowUpLeft size={17} /></Link>
              </div>
              <div className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {highlights.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-md"><Icon size={18} className="text-violet-300" /><p className="mt-3 text-sm font-semibold text-white">{title}</p><p className="mt-1 text-[11px] leading-5 text-white/35">{text}</p></div>)}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[100px]" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_100px_-35px_rgba(139,92,246,.65)] backdrop-blur-xl sm:p-8">
                <div className="mb-5 flex items-center justify-between"><div><p className="text-xs text-white/35">محصول پیشنهادی</p><p className="mt-1 text-sm font-semibold text-white">MacBook Air</p></div><span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] text-emerald-300">موجود</span></div>
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-white/[0.025]"><div className="absolute inset-8 rounded-full bg-cyan-300/10 blur-3xl" /><img src="/products/mac.jpeg" alt="MacBook" className="relative w-[88%] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,.45)] transition duration-700 hover:scale-105" /></div>
                <div className="mt-5 flex items-end justify-between"><div><p className="text-xs text-white/35">برای کار و خلاقیت</p><p className="mt-1 text-xl font-bold text-white">قدرت، بدون پیچیدگی</p></div><div className="rounded-xl bg-violet-500/10 px-3 py-2 text-xs text-violet-200">ویژه</div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8" aria-labelledby="categories-title">
          <div className="mb-8 flex items-end justify-between gap-4"><div><span className="text-xs font-medium text-cyan-300/70">دسته‌بندی‌ها</span><h2 id="categories-title" className="mt-2 text-2xl font-black text-white sm:text-3xl">هر چیزی برای ستاپت</h2></div><Link href="/products" className="hidden items-center gap-2 text-sm text-white/45 transition hover:text-white sm:flex">مشاهده همه <ArrowLeft size={15} /></Link></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ title, subtitle, icon: Icon, href, accent }) => <Link key={title} href={href} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-300/25 hover:bg-white/[0.05]"><div className={`mb-8 flex h-11 w-11 items-center justify-center rounded-xl border ${accent === "cyan" ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-200" : accent === "pink" ? "border-pink-300/20 bg-pink-300/10 text-pink-200" : "border-violet-300/20 bg-violet-300/10 text-violet-200"}`}><Icon size={20} /></div><p className="text-sm font-bold text-white">{title}</p><p className="mt-1 text-[11px] text-white/35">{subtitle}</p><ArrowLeft size={14} className="absolute bottom-5 left-5 text-white/20 transition group-hover:-translate-x-1 group-hover:text-white/60" /></Link>)}
          </div>
        </section>

        <div id="featured" className="scroll-mt-24"><FeaturedLaptops /></div>

        <section className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8"><div className="relative overflow-hidden rounded-[2rem] border border-pink-300/10 bg-gradient-to-l from-pink-500/[0.10] via-violet-500/[0.08] to-cyan-400/[0.06] p-7 sm:p-10"><div className="relative flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center"><div><span className="text-xs font-medium text-pink-300/75">پیشنهاد ویژه</span><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">برای خرید بعدی آماده‌ای؟</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">محصول موردنظرت را پیدا کن و برای انتخاب بهتر، مشخصات و موجودی را بررسی کن.</p></div><Link href="/products" className="shrink-0 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:bg-cyan-100">شروع خرید</Link></div></div></section>
      </main>
      <Footer />
    </>
  );
}


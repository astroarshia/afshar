import Link from "next/link";
import { ArrowUpLeft, Clock3, Headphones, MapPin, Phone } from "lucide-react";

const links = [
  { label: "لپ‌تاپ", href: "/products" },
  { label: "مینی کیس", href: "/products" },
  { label: "ذخیره‌سازی", href: "/products" },
  { label: "پرینتر", href: "/products" },
  { label: "لوازم جانبی", href: "/products" },
];

export default function Footer() {
  return (
    <footer dir="rtl" className="relative mt-8 overflow-hidden border-t border-white/[0.08] bg-black/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-violet-400/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_.8fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-black text-white">افشار سیستم <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,.9)]" /></Link>
            <p className="mt-4 max-w-md text-sm leading-8 text-white/40">انتخاب و خرید تجهیزات کامپیوتری با تمرکز روی کیفیت، تست کالا و پشتیبانی تخصصی.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-white/45"><Headphones size={15} className="text-violet-300" /> پشتیبانی تخصصی</div>
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-white/45"><Clock3 size={15} className="text-cyan-300" /> پاسخ‌گویی سریع</div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">دسترسی سریع</h3>
            <nav className="mt-5 grid gap-3">{links.map((link) => <Link key={link.label} href={link.href} className="text-sm text-white/40 transition hover:text-white">{link.label}</Link>)}</nav>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">ارتباط با افشار سیستم</h3>
            <div className="mt-5 grid gap-4 text-sm text-white/40">
              <div className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-pink-300" /><span>تهران، خیابان ولیعصر</span></div>
              <div className="flex items-center gap-3"><Phone size={17} className="shrink-0 text-cyan-300" /><span dir="ltr">0912 924 9131</span></div>
              <div className="flex items-center gap-3"><Clock3 size={17} className="shrink-0 text-violet-300" /><span>هر روز ۷ تا ۲۱</span></div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.07] pt-6 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} افشار سیستم — تمامی حقوق محفوظ است.</p>
          <Link href="/products" className="group inline-flex items-center gap-2 transition hover:text-white/60">مشاهده فروشگاه <ArrowUpLeft size={14} className="transition group-hover:-translate-y-0.5" /></Link>
        </div>
      </div>
    </footer>
  );
}

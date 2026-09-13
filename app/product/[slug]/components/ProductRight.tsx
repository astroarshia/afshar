import type { Product } from "@/types/product";

export default function ProductRight({ product }: { product: Product }) {
  return (
    <section className="lg:sticky lg:top-24 lg:self-start">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-xl shadow-[0_0_70px_-20px_rgba(236,72,153,0.45)]">
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent" />
        <span className="mb-1 block text-sm text-white/50">قیمت</span>
        <div className="mb-4 flex items-center gap-3">
          <strong className="bg-gradient-to-l from-[#67e8f9] to-[#a78bfa] bg-clip-text font-['JetBrains_Mono'] text-3xl font-bold text-transparent">{product.price.toLocaleString("fa-IR")}</strong>
          <span className="text-sm text-white/50">تومان</span>
        </div>
        {product.compareAtPrice && (
          <div className="mb-5 flex items-center gap-2">
            <del className="font-['JetBrains_Mono'] text-sm text-white/35">{product.compareAtPrice.toLocaleString("fa-IR")} تومان</del>
            <span className="rounded-full border border-[#ec4899]/30 bg-[#ec4899]/10 px-2 py-0.5 text-xs font-medium text-[#e879f9]">{product.discountPercent}% تخفیف</span>
          </div>
        )}
        <div className="mb-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_6px_#22d3ee]" /><strong className="text-sm font-medium text-white/90">{product.availability}</strong></div>
          <p className="font-['JetBrains_Mono'] text-xs text-white/45">موجودی: {product.stockCount} عدد</p>
        </div>
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-white/70">انتخاب مدل</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button key={variant.id} type="button" disabled={!variant.inStock} className="rounded-xl border border-white/15 bg-white/[0.03] px-3.5 py-2 text-sm text-white/85 transition-colors hover:border-[#8b5cf6]/60 hover:bg-[#8b5cf6]/10 disabled:cursor-not-allowed disabled:border-white/5 disabled:text-white/25 disabled:line-through">
                {variant.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 space-y-2.5 border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 text-sm text-white/60"><span className="text-[#a78bfa]">◈</span><span>گارانتی: {product.warranty}</span></div>
          <div className="flex items-center gap-2 text-sm text-white/60"><span className="text-[#a78bfa]">◷</span><span>مدت گارانتی: {product.warrantyDuration}</span></div>
          <div className="flex items-center gap-2 text-sm text-white/60"><span className="text-[#67e8f9]">▣</span><span>{product.shipping}</span></div>
          <p className="pr-6 text-xs text-white/40">{product.shippingTime}</p>
        </div>
        <button type="button" className="w-full rounded-2xl bg-gradient-to-l from-[#7c3aed] via-[#8b5cf6] to-[#ec4899] py-3.5 text-sm font-bold text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.7)] transition-transform hover:scale-[1.01]">
          افزودن به سبد خرید
        </button>
      </div>
    </section>
  );
}

import type { Product } from "@/types/product";

export default function ProductCenter({ product }: { product: Product }) {
  const filledStars = Math.round(product.rating.value);

  return (
    <section className="lg:px-2">
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-3 py-1 text-xs font-medium text-[#a78bfa]">{product.brand}</span>
        <span className="text-xs text-white/40">{product.category}</span>
      </div>
      <h1 className="mb-3 text-3xl font-extrabold leading-snug text-white">{product.title}</h1>
      <div className="mb-5 flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" className={`h-4 w-4 ${i < filledStars ? "fill-[#a78bfa]" : "fill-white/10"}`}>
              <path d="M12 2.5 15 9l7 .8-5.2 4.8L18.2 21 12 17.4 5.8 21l1.4-6.4L2 9.8 9 9z" />
            </svg>
          ))}
        </div>
        <strong className="text-sm text-white/85">{product.rating.value}</strong>
        <span className="text-sm text-white/40">({product.rating.count} نظر)</span>
      </div>
      <p className="mb-8 max-w-[62ch] text-[15px] leading-8 text-white/60">{product.shortDescription}</p>
      <div className="mb-9">
        <h3 className="mb-4 text-base font-semibold text-white/90">ویژگی‌های محصول</h3>
        <ul className="grid grid-cols-2 gap-2.5">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white/75">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 fill-none stroke-[#22d3ee] stroke-[3]"><path d="M4 12.5 9.5 18 20 6" /></svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-9">
        <h3 className="mb-3 text-base font-semibold text-white/90">توضیحات</h3>
        <p className="max-w-[68ch] text-[15px] leading-8 text-white/55">{product.description}</p>
      </div>
      <div>
        <h3 className="mb-3 text-base font-semibold text-white/90">مشخصات فنی</h3>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          {product.specs.map((spec, index) => (
            <div key={index} className={`flex items-center justify-between px-4 py-3 font-['JetBrains_Mono'] text-[13px] ${index % 2 === 0 ? "bg-white/[0.025]" : "bg-transparent"} ${index !== 0 ? "border-t border-white/[0.06]" : ""}`}>
              <span className="text-white/45">{spec.label}</span>
              <span className="text-white/85">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

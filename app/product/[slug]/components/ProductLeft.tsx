import type { Product } from "@/types/product";

export default function ProductLeft({ product }: { product: Product }) {
  const [mainImage, ...restImages] = product.images;

  return (
    <section className="relative">
      <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-xl shadow-[0_0_60px_-20px_rgba(124,58,237,0.55)]">
        <span className="pointer-events-none absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#67e8f9,#0a0920_70%)] shadow-[0_0_8px_#22d3ee]" />
        <span className="pointer-events-none absolute top-3 left-3 h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#e879f9,#0a0920_70%)] shadow-[0_0_8px_#ec4899]" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#a78bfa,#0a0920_70%)] shadow-[0_0_8px_#7c3aed]" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#67e8f9,#0a0920_70%)] shadow-[0_0_8px_#22d3ee]" />

        <h2 className="mb-4 text-sm font-medium text-white/60">گالری محصول</h2>

        {mainImage && (
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0920]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,58,237,0.25),transparent_60%)]" />
            <img src={mainImage.url} alt={mainImage.alt} className="relative aspect-square w-full object-contain p-6" />
          </div>
        )}

        {restImages.length > 0 && (
          <div className="mt-3 grid grid-cols-4 gap-3">
            {restImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0920] transition-colors hover:border-[#8b5cf6]/60">
                <img src={image.url} alt={image.alt} className="aspect-square w-full object-contain p-2" />
              </div>
            ))}
          </div>
        )}

        {product.video && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#22d3ee]/25 bg-[#22d3ee]/[0.06] px-3 py-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#67e8f9]"><path d="M8 5v14l11-7z" /></svg>
            <span className="text-xs text-[#67e8f9]">ویدیوی محصول موجود است</span>
          </div>
        )}
      </div>
    </section>
  );
}

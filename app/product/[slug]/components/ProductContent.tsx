import type { Product } from "@/types/product";
import ProductLeft from "./ProductLeft";
import ProductCenter from "./ProductCenter";
import ProductRight from "./ProductRight";

export default function ProductContent({ product }: { product: Product }) {
  return (
    <main dir="rtl" lang="fa" className="relative mx-auto mt-24 max-w-[1400px] px-6 py-12 font-['Vazirmatn']">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,58,237,0.16),transparent_70%)]" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr_0.85fr] lg:gap-8">
        <ProductLeft product={product} />
        <ProductCenter product={product} />
        <ProductRight product={product} />
      </div>
    </main>
  );
}

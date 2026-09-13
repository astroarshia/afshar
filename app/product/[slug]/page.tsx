import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/Products";
import Background from "@/src/UI/Background";
import Header from "@/src/UI/Header";
import ProductContent from "./components/ProductContent";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Background />
      <Header />
      <ProductContent product={product} />
    </>
  );
}

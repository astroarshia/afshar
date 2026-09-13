import type { Product } from "@/types/product";

const PRODUCTS: Product[] = [
  {
    id: "hyperx-cloud-ii-wireless",
    slug: "hyperx-cloud-ii-wireless",
    sku: "HX-CL2-WL-BLK",
    title: "هدست گیمینگ HyperX Cloud II Wireless",
    brand: "HyperX",
    category: "هدست گیمینگ",
    categorySlug: "headset",
    tags: ["گیمینگ", "هدست", "بی‌سیم", "HyperX", "Cloud II", "7.1"],
    shortDescription:
      "هدست بی‌سیم گیمینگ با صدای فراگیر ۷.۱، باتری قدرتمند و میکروفون حذف نویز؛ مناسب برای گیمینگ طولانی.",
    description:
      "HyperX Cloud II Wireless یک هدست گیمینگ بی‌سیم با کیفیت صدای بالا، طراحی راحت و باتری قدرتمند است. این هدست با اتصال بی‌سیم ۲.۴ گیگاهرتز، درایورهای ۵۳ میلی‌متری و صدای فراگیر مجازی ۷.۱ تجربه‌ای مناسب برای بازی، موسیقی و مکالمه ارائه می‌دهد. طراحی سبک و استفاده از فوم حافظه‌دار باعث شده برای استفاده طولانی‌مدت نیز راحت باشد.",
    features: [
      "صدای فراگیر مجازی 7.1",
      "اتصال بی‌سیم 2.4GHz",
      "عمر باتری تا 30 ساعت",
      "میکروفون حذف نویز",
      "درایورهای 53 میلی‌متری",
      "فوم حافظه‌دار",
      "میکروفون قابل جدا شدن",
      "کنترل صدا روی بدنه",
    ],
    price: 8450000,
    compareAtPrice: 9900000,
    currency: "IRR",
    discountPercent: 15,
    images: [
      { url: "https://hyperx.com/cdn/shop/files/hyperx_cloud_ii_wireless_1_main.jpg?v=1763563198", alt: "هدست گیمینگ HyperX Cloud II Wireless نمای اصلی" },
      { url: "https://hyperx.com/cdn/shop/files/hyperx_cloud_ii_wireless_3_side.jpg?v=1763563198", alt: "نمای جانبی هدست HyperX Cloud II Wireless" },
      { url: "https://hyperx.com/cdn/shop/files/hyperx_cloud_ii_wireless_5_bottom.jpg?v=1763563198", alt: "میکروفون هدست HyperX Cloud II Wireless" },
      { url: "https://hyperx.com/cdn/shop/files/hyperx_cloud_ii_wireless_6_accessories.jpg?v=1763563198", alt: "جعبه و لوازم جانبی HyperX Cloud II Wireless" },
    ],
    video: null,
    inStock: true,
    stockCount: 18,
    availability: "موجود در انبار",
    rating: { value: 4.7, count: 218 },
    reviewSummary: { fiveStar: 176, fourStar: 29, threeStar: 8, twoStar: 3, oneStar: 2 },
    variants: [
      { id: "black", label: "مشکی", inStock: true },
      { id: "red", label: "قرمز", inStock: false },
    ],
    specs: [
      { label: "نوع محصول", value: "هدست گیمینگ بی‌سیم" },
      { label: "برند", value: "HyperX" },
      { label: "مدل", value: "Cloud II Wireless" },
      { label: "نوع اتصال", value: "Wireless 2.4GHz" },
      { label: "درایور", value: "53mm Neodymium" },
      { label: "صدای فراگیر", value: "Virtual 7.1" },
      { label: "میکروفون", value: "Noise Cancelling" },
      { label: "عمر باتری", value: "تا 30 ساعت" },
      { label: "برد بی‌سیم", value: "تا 20 متر" },
      { label: "وزن", value: "320 گرم" },
      { label: "رنگ", value: "مشکی" },
      { label: "سازگاری", value: "PC / PS5 / PS4" },
    ],
    warranty: "گارانتی معتبر",
    warrantyDuration: "18 ماه",
    shipping: "ارسال به سراسر کشور",
    shippingTime: "1 تا 3 روز کاری",
    seller: { name: "افشار سیستم", rating: 4.8 },
  },
];

export async function getAllProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return PRODUCTS.find((product) => product.slug === slug) ?? null;
}

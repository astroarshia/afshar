import { laptops } from "@/src/UI/data/laptops";
import Link from "next/link";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const laptop = laptops.find(
    (item) => item.id === Number(id)
  );

  if (!laptop) {
    return (
      <main
        dir="rtl"
        className="
          flex min-h-screen
          items-center justify-center
          bg-[#050507]
          text-white
        "
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            محصول پیدا نشد
          </h1>

          <Link
            href="/"
            className="
              mt-5 inline-block
              rounded-xl
              bg-violet-500/20
              px-5 py-3
              text-sm
              text-cyan-300
            "
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#050507]
        px-5 py-32
        text-white
      "
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-sm text-white/40">
          {laptop.brand}
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          {laptop.name}
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="
            flex min-h-[400px]
            items-center justify-center
            rounded-3xl
            border border-white/10
            bg-white/[0.03]
          ">
            <img
              src={laptop.image}
              alt={laptop.name}
              className="
                max-h-[350px]
                max-w-full
                object-contain
              "
            />
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.04] p-4">
                <span className="text-xs text-white/40">
                  پردازنده
                </span>
                <p className="mt-2">{laptop.cpu}</p>
              </div>

              <div className="rounded-xl bg-white/[0.04] p-4">
                <span className="text-xs text-white/40">
                  گرافیک
                </span>
                <p className="mt-2">{laptop.gpu}</p>
              </div>

              <div className="rounded-xl bg-white/[0.04] p-4">
                <span className="text-xs text-white/40">
                  رم
                </span>
                <p className="mt-2">{laptop.ram}</p>
              </div>

              <div className="rounded-xl bg-white/[0.04] p-4">
                <span className="text-xs text-white/40">
                  حافظه
                </span>
                <p className="mt-2">{laptop.storage}</p>
              </div>
            </div>

            <div className="mt-8">
              <span className="text-3xl font-bold">
                {laptop.price.toLocaleString("fa-IR")}
              </span>

              <span className="mr-2 text-sm text-white/40">
                تومان
              </span>
            </div>

            <button
              type="button"
              className="
                mt-8 w-full
                rounded-xl
                bg-violet-500/20
                px-6 py-4
                font-medium
                transition
                hover:bg-violet-500/30
              "
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
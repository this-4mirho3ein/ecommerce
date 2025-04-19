import Container from "@/components/Container";
import { ProductItemProps } from "@/types/type";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ProductActions from "@/components/ProductActions";
import {
  AlertCircle,
  ChevronLeft,
  Home,
  Store,
  ShieldCheck,
  Truck,
  ClockIcon,
  Star,
  Share2,
  Heart,
} from "lucide-react";

interface IProductProps {
  params: { id: string };
}

// Function to format numbers in Persian with comma separators
const formatNumber = (num: number): string => {
  return num.toLocaleString("fa-IR");
};

// Fetch product data on the server
async function getProduct(id: string) {
  try {
    const res = await axios(`http://localhost:3004/products/${id}`);
    return {
      product: res.data as ProductItemProps,
      error: null,
    };
  } catch (err) {
    console.error("Error fetching product:", err);
    return {
      product: null,
      error: "خطا در دریافت اطلاعات محصول",
    };
  }
}

// Server component for product details
export default async function ProductDetails({ params }: IProductProps) {
  const { id } = await Promise.resolve(params);
  const { product, error } = await getProduct(id);

  // Error state
  if (error || !product) {
    return (
      <Container>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <div className="text-red-600 mb-6 bg-red-50 p-8 rounded-2xl shadow-sm flex items-center max-w-md mx-auto">
            <AlertCircle className="h-10 w-10 ml-4 flex-shrink-0 text-red-500" />
            <span className="text-lg font-medium text-red-700">
              {error || "محصول مورد نظر یافت نشد"}
            </span>
          </div>
          <Link
            href="/store"
            className="flex items-center mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md group"
          >
            <span className="font-medium">بازگشت به فروشگاه</span>
            <ChevronLeft className="h-5 w-5 mr-2 group-hover:mr-3 transition-all" />
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-10">
        {/* Breadcrumb */}
        <section className="text-gray-500 mb-8 bg-white px-6 py-4 rounded-xl shadow-sm flex items-center justify-between">
          <Link
            href="/store"
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg px-4 py-2 transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm font-medium">برگشت به فروشگاه</span>
          </Link>

          <nav dir="rtl" className="flex items-center text-sm">
            <Link
              href="/"
              className="flex items-center hover:text-indigo-600 transition-colors"
            >
              <Home className="ml-1 h-4 w-4" />
              خانه
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href="/store"
              className="flex items-center hover:text-indigo-600 transition-colors"
            >
              <Store className="ml-1 h-4 w-4" />
              فروشگاه
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800 font-medium truncate max-w-[200px]">
              {product.title}
            </span>
          </nav>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 dir-rtl">
          {/* Product Image */}

          {/* Product Info */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 flex flex-col h-full">
            {/* Product badges */}
            <div className="flex gap-2 mb-4 justify-end">
              <span className="inline-flex items-center px-2.5 py-2.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                موجود در انبار
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                پرفروش
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-right">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center justify-end mb-6">
              <span className="text-sm text-gray-500 ml-2">(۱۲۵ نظر)</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-yellow-400 ml-0.5"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>

            {/* Price section */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-5 mb-6 text-right">
              <div className="flex flex-col">
                <div className="flex items-center justify-end mb-2">
                  <span className="text-3xl font-bold text-gray-800">
                    {formatNumber(Number(product.price))}
                  </span>
                  <span className="text-sm text-gray-500 mx-1">تومان</span>
                </div>

                {Number(product.price) > 300000 && (
                  <div className="flex justify-end items-center">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium ml-2">
                      ۱۵٪ تخفیف
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      {formatNumber(Math.round(Number(product.price) * 1.15))}{" "}
                      تومان
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Description section */}
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-700 mb-3 text-right flex items-center justify-end">
                <span>ویژگی‌های محصول</span>
              </h2>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <ul className="space-y-2 text-right text-gray-600">
                  <li className="flex items-center justify-end">
                    <span>کیفیت بالا و طراحی بی‌نظیر</span>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full ml-2"></div>
                  </li>
                  <li className="flex items-center justify-end">
                    <span>مناسب برای استفاده روزانه</span>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full ml-2"></div>
                  </li>
                  <li className="flex items-center justify-end">
                    <span>طراحی زیبا و کاربردی</span>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full ml-2"></div>
                  </li>
                </ul>
              </div>

              <h2 className="text-lg font-semibold text-gray-700 mb-3 text-right">
                توضیحات محصول:
              </h2>
              <p className="text-gray-600 mb-8 text-right leading-7">
                {product.description}
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex justify-end items-center mb-6">
                <ProductActions id={id} />
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600 text-center">
                    ارسال سریع
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-600 text-center">
                    ضمانت کیفیت
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2">
                    <ClockIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-xs text-gray-600 text-center">
                    پشتیبانی ۲۴/۷
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden relative group">
            {/* Save button */}
            <button
              className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/90 text-gray-600 hover:text-red-500 flex items-center justify-center shadow-sm hover:shadow transition-all duration-200"
              aria-label="افزودن به علاقه‌مندی‌ها"
            >
              <Heart className="h-5 w-5" />
            </button>

            {/* Share button */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 text-gray-600 hover:text-blue-500 flex items-center justify-center shadow-sm hover:shadow transition-all duration-200"
              aria-label="اشتراک‌گذاری محصول"
            >
              <Share2 className="h-5 w-5" />
            </button>

            {/* Main product image with zoom effect */}
            <div className="relative aspect-square overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10"></div>
              <Image
                src={product.image || "/placeholder-product.jpg"}
                alt={product.title || "تصویر محصول"}
                fill
                className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                quality={95}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

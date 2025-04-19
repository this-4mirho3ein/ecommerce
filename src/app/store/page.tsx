import axios from "axios";
import { IProductList } from "@/types/type";
import Container from "@/components/Container";
import ProductItem from "@/components/ProductItem";
import { AlertCircle, ShoppingBag, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/Pagination";

interface IStoreProps {
  params: object;
  searchParams: { page?: string; per_page?: string; title?: string };
}

async function getProducts({ searchParams }: IStoreProps) {
  const page = searchParams.page ?? "1";
  const per_page = searchParams.per_page ?? "8";
  const title = searchParams.title ?? "";
  try {
    const res = await axios(
      `http://localhost:3004/products?_page=${page}&_per_page=${per_page}&title=${title}`
    );
    return {
      products: res.data as IProductList,
      error: null,
    };
  } catch (err) {
    console.error("Error fetching products:", err);
    return {
      products: null,
      error: "خطا در دریافت محصولات",
    };
  }
}

export default async function StorePage({ params, searchParams }: IStoreProps) {
  const { products, error } = await getProducts({ params, searchParams });
  const productItems = products?.data || [];
  const currentPage = parseInt(searchParams.page ?? "1", 10);
  const totalPages = products?.pages || 1;

  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full h-[260px] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <Container className="relative h-full flex flex-col justify-center items-center text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            فروشگاه محصولات
          </h1>
          <div className="flex items-center text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">
              خانه
            </Link>
            <ChevronLeft className="mx-2 h-4 w-4" />
            <span className="text-white font-medium">فروشگاه</span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          {/* Results Bar */}
          {!error && productItems.length > 0 && (
            <div className="mb-10 flex justify-between items-center">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">محصولات</h2>
              </div>
              <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                <span className="text-sm text-gray-500">
                  مشاهده{" "}
                  <span className="font-bold text-gray-900">
                    {productItems.length}
                  </span>{" "}
                  محصول
                </span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-white rounded-xl shadow-md p-10 text-center my-12 max-w-xl mx-auto border border-red-100">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                مشکلی در دریافت اطلاعات پیش آمد
              </h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {error}. لطفا مجدداً تلاش کنید یا با پشتیبانی تماس بگیرید.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-all duration-300 shadow-sm hover:shadow"
              >
                تلاش مجدد
              </button>
            </div>
          )}

          {/* Products Grid without client-side animations */}
          {!error && productItems.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {productItems.map((item) => (
                  <div key={item.id} className="group h-full animate-fadeIn">
                    <Link href={`/store/${item.id}`} className="block h-full">
                      <ProductItem {...item} />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <>
                  <div className="flex items-center justify-between mt-10 mb-6">
                    <div className="text-sm text-gray-500">
                      صفحه{" "}
                      <span className="font-medium text-gray-900">
                        {currentPage}
                      </span>{" "}
                      از{" "}
                      <span className="font-medium text-gray-900">
                        {totalPages}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      تعداد کل محصولات:{" "}
                      <span className="font-medium text-gray-900">
                        {products?.items || 0}
                      </span>
                    </div>
                  </div>
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                  />
                </>
              )}
            </>
          )}

          {/* Empty State */}
          {!error && productItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                هیچ محصولی یافت نشد
              </h2>
              <p className="text-gray-500 text-center max-w-md mb-8">
                در حال حاضر محصولی برای نمایش وجود ندارد. لطفا بعدا مجددا بررسی
                کنید.
              </p>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-all duration-300 shadow-sm hover:shadow"
              >
                بازگشت به صفحه اصلی
              </Link>
            </div>
          )}

          {/* Store Benefits */}
          {!error && productItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="h-8 w-8 text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="3" width="22" height="5" rx="2" />
                    <rect x="1" y="8" width="22" height="5" rx="2" />
                    <rect x="1" y="13" width="22" height="5" rx="2" />
                    <rect x="1" y="18" width="22" height="5" rx="2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  کیفیت برتر
                </h3>
                <p className="text-gray-500 text-sm">
                  تمامی محصولات با بالاترین کیفیت و ضمانت اصالت ارائه می‌شوند
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="h-8 w-8 text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  تحویل سریع
                </h3>
                <p className="text-gray-500 text-sm">
                  ارسال سریع و مطمئن به سراسر کشور با بسته‌بندی استاندارد
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="h-8 w-8 text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  پشتیبانی ۲۴/۷
                </h3>
                <p className="text-gray-500 text-sm">
                  پشتیبانی همه روزه و در تمام ساعات روز، آماده پاسخگویی به شما
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
